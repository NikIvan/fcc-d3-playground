import {useEffect, useState} from 'react';
import {csv, timeParse} from 'd3';

const remoteUrl = '/api/v1/covid-data';
const parseDay = timeParse('%m/%d/%y');

const transformCovidData = (rawData) => {
  const dates = rawData.columns.slice(4);

  return dates.map((date) => ({
    totalDeaths: rawData.reduce((acc, el) => acc + +el[date], 0),
    date: parseDay(date),
  }));
};

export const useCovidData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      let remoteData = null;

      try {
        remoteData = await csv(remoteUrl);
      } catch (e) {
        console.error(`Cannot get covid data: ${e.message}`);
      }

      setData(transformCovidData(remoteData));
    }

    getData();
  }, []);

  return [data];
};
