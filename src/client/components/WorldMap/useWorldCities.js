import {useEffect, useState} from 'react';
import {csv} from 'd3';

const dataUrl = '/api/v1/world-cities';
const dataInitialState = [];

const row = (d) => {
  const newD = {...d};

  newD.lat = +d.lat;
  newD.lng = +d.lng;
  newD.population = +d.population;

  return newD;
};

function useWorldCities() {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const cities = await csv(dataUrl, row);

      console.log(cities[0]);
      setData(cities);
      setIsDataLoaded(true);
    }

    getData();
  }, []);

  return [data, isDataLoaded];
}

export {useWorldCities};
