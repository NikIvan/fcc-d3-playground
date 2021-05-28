import {useEffect, useState} from 'react';
import {csv, timeParse} from 'd3';

const remoteUrl = '/api/v1/covid-data';
const parseDay = timeParse('%m/%d/%y');

const STATE_FIELD = 'Province/State';
const COUNTRY_FIELD = 'Country/Region';

const getDates = (rawData) => rawData.columns.slice(4);

const groupDataByCountry = (rawData) => {
  const dates = getDates(rawData);
  const latestData = dates[dates.length - 1];

  const data = rawData.filter((countryData) => {
    return countryData[STATE_FIELD] === '' && countryData[latestData] > 5000;
  });

  return data.reduce((acc, countryData) => {
    const deathsByDateByCountry = dates.map((date) => ({
      totalDeaths: +countryData[date],
      date: parseDay(date),
      countryName: countryData[COUNTRY_FIELD],
    }));

    deathsByDateByCountry.countryName = countryData[COUNTRY_FIELD];

    acc.push(deathsByDateByCountry);

    return acc;
  }, []);
};

const getMaxDeathsByCountry = (data) => data
  .map((countryData) => countryData[countryData.length - 1]);

const dataInitialState = [];
const maxDeathsInitialState = [];

export const useCovidData = () => {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [maxDeaths, setMaxDeaths] = useState(maxDeathsInitialState);

  useEffect(() => {
    async function getData() {
      let remoteData = null;

      try {
        setIsDataLoading(true);
        remoteData = await csv(remoteUrl);
        setIsDataLoading(false);
      } catch (e) {
        console.error(`Cannot get covid data: ${e.message}`);
      }

      const dataByCountry = groupDataByCountry(remoteData);

      setData(dataByCountry);

      setMaxDeaths(getMaxDeathsByCountry(dataByCountry));
    }

    getData();
  }, []);

  return {data, isDataLoading, maxDeaths};
};
