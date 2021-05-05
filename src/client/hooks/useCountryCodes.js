import {useState, useEffect} from 'react';
import {csv} from 'd3';

const dataUrl = '/api/v1/countries-slim-3';
const dataInitialState = [];

export function useCountryCodes() {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const responseData = await csv(dataUrl);

      setData(responseData);
      setIsDataLoaded(true);
    }

    getData();
  }, []);

  return [data, isDataLoaded];
}
