import React from 'react';
import {
  scaleBand,
  scaleLinear,
  max,
} from 'd3';

import {usePopulation} from './usePopulation';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';
import {Marks} from './Marks';

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

const xValue = (d) => d.Population;
const yValue = (d) => d.Country;

function BarChart() {
  const population = usePopulation();

  if (population.length === 0) {
    return (<pre>Loading...</pre>);
  }

  const yScale = scaleBand()
    .domain(population.map(yValue))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(population, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height} style={{backgroundColor: 'palegoldenrod'}}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={population}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
}

export {BarChart};
