import React from 'react';
import {
  scaleTime,
  scaleLog,
  extent,
  max,
  line,
  timeFormat,
} from 'd3';

import {useCovidData} from './useCovidData.js';

import {ChartPage} from '../../layout/ChartPage.jsx';
import {XAxis} from './XAxis.jsx';
import {YAxis} from './YAxis.jsx';

import classes from './CovidChart.scss';

const width = 800;
const height = 400;

const margin = {
  top: 32,
  right: 32,
  bottom: 32,
  left: 72,
};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xValue = (d) => d.date;
const yValue = (d) => d.totalDeaths;

const xAxisFormatter = timeFormat('%b %y');

const CovidChart = () => {
  const [data] = useCovidData();

  if (data == null) {
    return (<div>Loading...</div>);
  }

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLog()
    .domain([1, max(data, yValue)])
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  return (
    <ChartPage>
      <svg width={width} height={height} className={classes.chart}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <XAxis
            xScale={xScale}
            height={innerHeight}
            xAxisFormatter={xAxisFormatter}
          />
          <YAxis
            yScale={yScale}
            width={innerWidth}
          />
          <path d={lineGenerator(data)} />
          <text className={classes.chartLabel}>Coronavirus Global Deaths Over Time</text>
          <text
            className={classes.yAxisLabel}
            transform={`translate(-48, ${(innerHeight / 2)}) rotate(-90)`}
            textAnchor={'middle'}
          >Cumulative Deaths</text>
        </g>
      </svg>
    </ChartPage>
  );
};

export {CovidChart};
