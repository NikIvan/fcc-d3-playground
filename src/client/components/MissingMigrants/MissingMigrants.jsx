import React from 'react';
import {
  extent,
  scaleLinear,
  scaleTime,
  timeFormat,
  bin,
  timeMonths,
  sum,
  max,
} from 'd3';

import {ChartPage} from '../layout/ChartPage.jsx';
import {useData} from './useData';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';
import classes from './MissingMigrants.scss';
import {Marks} from './Marks';

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

const xValue = (d) => d.reportedDate;
const xAxisLabel = 'Time';

const yValue = (d) => d.totalDeadAndMissing;
const yAxisLabel = 'Total Dead and Missing';
const yAxisOffset = -69;

const xAxisTickFormat = timeFormat('%m/%d/%Y');
const tooltipFormat = (value) => value;

function MissingMigrants() {
  const [data, isDataLoaded] = useData();

  if (data.length === 0) {
    if (isDataLoaded) {
      return (<ChartPage>No data</ChartPage>);
    }

    return (<ChartPage>Loading...</ChartPage>);
  }

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])
    .nice();

  return (
    <ChartPage>
      <svg width={width} height={height} style={{backgroundColor: 'palegoldenrod'}}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <text
            className={classes.chartTitle}
            x={innerWidth / 2}
            y={innerHeight + margin.bottom / 1.66}
          >{xAxisLabel}</text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
          <text
            className={classes.chartTitle}
            transform={`translate(${yAxisOffset}, ${innerHeight / 2}) rotate(-90)`}
          >{yAxisLabel}</text>
          <Marks
            data={binnedData}
            xScale={xScale}
            yScale={yScale}
            innerHeight={innerHeight}
            tooltipFormat={tooltipFormat}
          />
        </g>
      </svg>
    </ChartPage>
  );
}

export {MissingMigrants};
