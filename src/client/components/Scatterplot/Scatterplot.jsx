import React from 'react';
import {extent, scaleLinear} from 'd3';

import {ChartPage} from '../layout/ChartPage.jsx';
import {useIrisData} from './useIrisData';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';
import classes from './Scatterplot.scss';
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

const xValue = (d) => d.petal_length;
const xAxisLabel = 'Petal length';

const yValue = (d) => d.sepal_width;
const yAxisLabel = 'Sepal width';
const yAxisOffset = -69;

const xAxisTickFormat = (d) => d;

function Scatterplot() {
  const [irisData, isDataLoaded] = useIrisData();

  if (irisData.length === 0) {
    if (isDataLoaded) {
      return (<ChartPage>No data</ChartPage>);
    }

    return (<ChartPage>Loading...</ChartPage>);
  }

  console.log({irisData});

  const xScale = scaleLinear()
    .domain(extent(irisData, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(irisData, yValue))
    .range([0, innerHeight])
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
            data={irisData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={10}
          />
        </g>
      </svg>
    </ChartPage>
  );
}

export {Scatterplot};
