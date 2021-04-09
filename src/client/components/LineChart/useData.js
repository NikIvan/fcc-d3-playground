import {useEffect, useState} from 'react';
import {csv} from 'd3';

const dataUrl = '/api/v1/temperature';
const dataInitialState = [];

export const useData = () => {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const row = (d) => {
        const newD = {};

        newD.timestamp = new Date(d.timestamp);
        newD.temperature = Number.parseFloat(d.temperature);

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
