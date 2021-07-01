import {useEffect, useState} from 'react';
import {csv, timeParse} from 'd3';

const remoteUrl = '/api/v1/covid-data';
const parseDay = timeParse('%m/%d/%y');

const STATE_FIELD = 'Province/State';
const COUNTRY_FIELD = 'Country/Region';

const dataInitialState = [];
const maxDeathsInitialState = [];
const middleDateInitialState = new Date();

const getDates = (rawData) => rawData.columns.slice(4);

const groupDataByCountry = (rawData) => {
  const dates = getDates(rawData);
  const latestDate = dates[dates.length - 1];

  const filterOptions = (countryData) => countryData[STATE_FIELD] === '' && countryData[latestDate] > 5000;

  const data = rawData.filter(filterOptions);

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

const getMiddleDate = (rawData) => {
  const dates = getDates(rawData);
  const firstDate = parseDay(dates[0]);
  const lastDate = parseDay(dates[dates.length - 1]);

  return (
    new Date((lastDate.getTime() + firstDate.getTime()) / 2)
  );
};

export const useCovidData = () => {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [maxDeathsPerCountry, setMaxDeathsPerCountry] = useState(maxDeathsInitialState);
  const [middleDate, setMiddleDate] = useState(middleDateInitialState);

  useEffect(() => {
    async function getData() {
      let remoteData = null;

      try {
        setIsDataLoading(true);
        remoteData = await csv(remoteUrl);
      } catch (e) {
        console.error(`Cannot get covid data: ${e.message}`);
      }

      const dataByCountry = groupDataByCountry(remoteData);

      setData(dataByCountry);
      setIsDataLoading(false);

      setMaxDeathsPerCountry(getMaxDeathsByCountry(dataByCountry));
      setMiddleDate(getMiddleDate(remoteData));
    }

    getData();
  }, []);

  return {
    data,
    isDataLoading,
    maxDeathsPerCountry,
    middleDate,
  };
};
