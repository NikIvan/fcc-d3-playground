import React from 'react';
import {
  scaleBand,
  scaleLinear,
  max,
  format,
} from 'd3';

import {usePopulation} from './usePopulation';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';
import {Marks} from './Marks';
import {ChartPage} from '../../layout/ChartPage.jsx';

import classes from './BarChart.scss';

const width = 960;
const height = 500;
const margin = {
  top: 40,
  right: 60,
  bottom: 100,
  left: 200,
};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xValue = (d) => d.Population;
const yValue = (d) => d.Country;

const siFormat = format('.2s');
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

function BarChart() {
  const population = usePopulation();

  if (population.length === 0) {
    return (<pre>Loading...</pre>);
  }

  const yScale = scaleBand()
    .domain(population.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(population, xValue)])
    .range([0, innerWidth]);

  return (
    <ChartPage>
      <svg width={width} height={height} style={{backgroundColor: 'palegoldenrod'}}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <text
            className={classes.chartTitle}
            x={innerWidth / 2}
            y={innerHeight + margin.bottom / 1.66}
          >Population</text>
          <Marks
            data={population}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </ChartPage>
  );
}

export {BarChart};
