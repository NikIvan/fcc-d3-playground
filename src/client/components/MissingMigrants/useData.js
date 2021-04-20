import {useEffect, useState} from 'react';
import {csv} from 'd3';

const dataUrl = '/api/v1/missing-migrants';
const dataInitialState = [];

export const useData = () => {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const row = (d) => {
        const newD = {};

        newD.location = d['Location Coordinates'];
        newD.totalDeadAndMissing = Number(d['Total Dead and Missing']);
        newD.reportedDate = new Date(d['Reported Date']);

        return newD;
      };

      const csvData = await csv(dataUrl, row);
      setData(csvData);
      setIsDataLoaded(true);
    }

    getData();
  }, []);

  return [data, isDataLoaded];
};
