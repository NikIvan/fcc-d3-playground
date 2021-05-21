import React from 'react';
import {
  extent,
  scaleLinear,
  scaleTime,
  timeFormat,
} from 'd3';

import {ChartPage} from '../../layout/ChartPage.jsx';
import {useData} from './useData.js';
import {AxisBottom} from './AxisBottom.jsx';
import {AxisLeft} from './AxisLeft.jsx';
import classes from './LineChart.scss';
import {Marks} from './Marks.jsx';

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

const xValue = (d) => d.timestamp;
const xAxisLabel = 'Time';

const yValue = (d) => d.temperature;
const yAxisLabel = 'Temperature';
const yAxisOffset = -69;

const xAxisTickFormat = timeFormat('%a');

function LineChart() {
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

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
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
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <text
            className={classes.chartTitle}
            transform={`translate(${yAxisOffset}, ${innerHeight / 2}) rotate(-90)`}
          >{yAxisLabel}</text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={3}
          />
        </g>
      </svg>
    </ChartPage>
  );
}

export {LineChart};
