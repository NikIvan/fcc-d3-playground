import {useState, useEffect} from 'react';
import {csv} from 'd3';

const dataUrl = '/api/v1/hiv-data';
const dataInitialState = [];

const transformRow = (d) => {
  const newD = {...d};

  newD.Year = +d.Year;
  newD.aids = +d['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)'];

  return newD;
};

export function useHIVData() {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const responseData = await csv(dataUrl, transformRow);

      setData(responseData);
      setIsDataLoaded(true);
    }

    getData();
  }, []);

  return [data, isDataLoaded];
}
