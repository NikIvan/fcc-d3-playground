import {useEffect, useState} from 'react';
import {json} from 'd3';
import {feature, mesh} from 'topojson';

const dataUrl = '/api/v1/world-map-geo-data';
const dataInitialState = {};

function useData() {
  const [data, setData] = useState(dataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const topology = await json(dataUrl);
      const {countries, land} = topology.objects;

      setData({
        countries: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
      setIsDataLoaded(true);
    }

    getData();
  }, []);

  return [data, isDataLoaded];
}

export {useData};
