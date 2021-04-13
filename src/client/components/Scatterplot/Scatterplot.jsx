import React, {useState} from 'react';
import {extent, scaleLinear} from 'd3';
import ReactDropdown from 'react-dropdown';

import {ChartPage} from '../layout/ChartPage.jsx';
import {useIrisData} from './useIrisData';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';
import classes from './Scatterplot.scss';
import {Marks} from './Marks';

import 'react-dropdown/style.css';

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

const attributes = [
  {value: 'petal_length', label: 'Petal Length'},
  {value: 'petal_width', label: 'Petal Width'},
  {value: 'sepal_length', label: 'Sepal Length'},
  {value: 'sepal_width', label: 'Sepal Width'},
  {value: 'species', label: 'Species'},
];

function getLabel(value) {
  for (let i = 0; i < attributes.length; i += 1) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }

  return null;
}

const xAttributeInitial = attributes[0].value;
const xAttributeSelectId = 'xAttributeSelect';

const yAttributeInitial = attributes[1].value;
const yAxisOffset = -69;
const yAttributeSelectId = 'yAttributeSelect';

const xAxisTickFormat = (d) => d;

function Scatterplot() {
  const [irisData, isDataLoaded] = useIrisData();
  const [xAttribute, setXAttribute] = useState(xAttributeInitial);
  const [yAttribute, setYAttribute] = useState(yAttributeInitial);

  if (irisData.length === 0) {
    if (isDataLoaded) {
      return (<ChartPage>No data</ChartPage>);
    }

    return (<ChartPage>Loading...</ChartPage>);
  }

  console.log({irisData, xAttribute});

  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

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
      <div className={classes.controls}>
        <div className={classes.controlGroup}>
          <label
            htmlFor={xAttributeSelectId}
            className={classes.dropdownLabel}
          >X axis: </label>
          <ReactDropdown
            value={xAttribute}
            id={xAttributeSelectId}
            onChange={({value}) => setXAttribute(value)}
            options={attributes}
            className={classes.select}
          />
        </div>
        <div className={classes.controlGroup}>
          <label
            className={classes.dropdownLabel}
            htmlFor={yAttributeSelectId}
          >Y axis: </label>
          <ReactDropdown
            value={yAttribute}
            id={yAttributeSelectId}
            onChange={({value}) => setYAttribute(value)}
            options={attributes}
            className={classes.select}
          />
        </div>
      </div>
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
