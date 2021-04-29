import {useEffect, useState} from 'react';
import {csv} from 'd3';

const dataUrl = '/api/v1/missing-migrants';
const dataInitialState = [];

export const useMissingMigrantsData = () => {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const row = (d) => {
        const newD = {};

        newD.location = d['Location Coordinates'];
        const [lat, lng] = newD.location.split(', ');
        newD.lng = Number(lng);
        newD.lat = Number(lat);

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
