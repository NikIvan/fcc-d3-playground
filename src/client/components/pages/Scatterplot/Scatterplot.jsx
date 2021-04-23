import React, {useState} from 'react';
import {extent, scaleLinear, scaleOrdinal} from 'd3';
import ReactDropdown from 'react-dropdown';

import {ChartPage} from '../../layout/ChartPage.jsx';
import {useIrisData} from './useIrisData';
import {AxisBottom} from './AxisBottom';
import {AxisLeft} from './AxisLeft';
import classes from './Scatterplot.scss';
import {Marks} from './Marks.jsx';
import {ColorLegend} from './ColorLegend.jsx';

import 'react-dropdown/style.css';

const width = 960;
const height = 500;
const margin = {
  top: 40,
  right: 200,
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

const circleRadius = 10;
const colorLegendLabel = 'Species';

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
const colorValue = (d) => d.species;

function Scatterplot() {
  const [irisData, isDataLoaded] = useIrisData();
  const [xAttribute, setXAttribute] = useState(xAttributeInitial);
  const [yAttribute, setYAttribute] = useState(yAttributeInitial);
  const [accentValue, setAccentValue] = useState(null);

  if (irisData.length === 0) {
    if (isDataLoaded) {
      return (<ChartPage>No data</ChartPage>);
    }

    return (<ChartPage>Loading...</ChartPage>);
  }

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

  const colorScale = scaleOrdinal()
    .domain(irisData.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  const setAccentValueHandler = (e) => {
    const newAccentValue = e.currentTarget.getAttribute('data-value');
    setAccentValue(newAccentValue);
  };

  const unsetAccentValue = () => {
    setAccentValue(null);
  };

  const filteredData = irisData.filter((d) => accentValue === colorValue(d));

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
          <g transform={`translate(${innerWidth + 60}, 60)`}>
            <text
              className={classes.chartTitle}
              x={35}
              y={-25}
            >{colorLegendLabel}</text>
            <ColorLegend
              colorScale={colorScale}
              tickSize={circleRadius}
              onMouseEnter={setAccentValueHandler}
              onMouseLeave={unsetAccentValue}
            />
          </g>
          <g opacity={accentValue ? 0.3 : 1}>
            <Marks
              data={irisData}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              xValue={xValue}
              yValue={yValue}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={circleRadius}
            />
          </g>
          {accentValue
          && <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />}
        </g>
      </svg>
    </ChartPage>
  );
}

export {Scatterplot};
