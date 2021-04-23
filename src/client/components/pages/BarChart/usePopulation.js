import {useEffect, useState} from 'react';
import {csv} from 'd3';

const populationUrl = '/api/v1/un-population';
const populationInitialState = [];

export const usePopulation = () => {
  const [population, setPopulation] = useState(populationInitialState);

  useEffect(() => {
    async function getPopulation() {
      const row = (d) => {
        const newD = {...d};

        newD.Population = +d['2020'] * 1000;

        return newD;
      };

      const data = await csv(populationUrl, row);
      const firstTen = data.slice(0, 10);
      setPopulation(firstTen);
    }

    getPopulation();
  }, []);

  return population;
};
