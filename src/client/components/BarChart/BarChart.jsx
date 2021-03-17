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
const margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 150,
};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

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
      const firstTen = data.slice(0, 10);
      // const data = await response.text();
      setPopulation(firstTen);
      console.dir(firstTen);
    }

    getPopulation();
  }, []);

  if (population.length === 0) {
    return (<pre>Loading...</pre>);
  }

  const yScale = scaleBand()
    .domain(population.map((d) => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(population, (d) => d.Population)])
    .range([0, innerWidth]);

  console.dir(xScale.ticks());

  return (
    <svg width={width} height={height} style={{backgroundColor: 'palegoldenrod'}}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={innerHeight}
              stroke="black"
            />
            <text
              style={{textAnchor: 'middle'}}
              y={innerHeight + 6}
              dy="0.71em"
            >{tickValue}</text>
          </g>))}
        {yScale.domain().map((tickValue) => (
          <g key={tickValue} transform={`translate(0, ${yScale(tickValue) + yScale.bandwidth() / 2})`}>
            <text
              dx="-0.71em"
              dy="0.32em"
              style={{textAnchor: 'end'}}
            >{tickValue}</text>
          </g>))}
        {population.map((d) => <rect
          key={d.Country}
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
        />)}
      </g>
    </svg>
  );
}

export {BarChart};
