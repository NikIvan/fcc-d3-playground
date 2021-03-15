import React, {useEffect, useState} from 'react';
import {
  csv,
  scaleBand,
  scaleLinear,
  max,
} from 'd3';

const populationUrl = '/api/v1/un-population';
const populationInitialState = [];

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

function BarChart() {
  const [population, setPopulation] = useState(populationInitialState);

  useEffect(() => {
    async function getPopulation() {
      const row = (d) => {
        const newD = {...d};

        newD.Population = +d['2020'];

        return newD;
      };

      const data = await csv(populationUrl, row);
      const firstTen = data.slice(0, data.length);
      // const data = await response.text();
      setPopulation(firstTen);
      console.dir(firstTen);
    }

    getPopulation();
  }, []);

  let populationEl = (<pre>Loading...</pre>);

  if (population.length !== 0) {
    const yScale = scaleBand()
      .domain(population.map((d) => d.Country))
      .range([0, height]);

    const xScale = scaleLinear()
      .domain([0, max(population, (d) => d.Population)])
      .range([0, width]);

    populationEl = population.map((d) => <rect
        key={d.Country}
        x={0}
        y={yScale(d.Country)}
        width={xScale(d.Population)}
        height={yScale.bandwidth()}
      />);
  }

  return (
    <>
      <header>
        <h1>BarChart</h1>
      </header>
      <section>
        <svg width={width} height={height}>
          <g>{populationEl}</g>
        </svg>
      </section>
    </>
  );
}

export {BarChart};
