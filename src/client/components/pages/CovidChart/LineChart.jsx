import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
  scaleTime,
  scaleLog,
  extent,
  max,
  line,
  timeFormat,
} from 'd3';

import {XAxis} from './XAxis.jsx';
import {YAxis} from './YAxis.jsx';

import classes from './CovidChart.scss';
import {VoronoiOverlay} from './VoronoiOverlay.jsx';
import {flattenArray} from '../../../utils.js';

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

const epsilon = 1;

const LineChart = ({data, maxDeaths}) => {
  const [activeRow, setActiveRow] = useState();
  const allData = useMemo(() => flattenArray(data), [data]);

  const xScale = useMemo(() => scaleTime()
    .domain(extent(data[0], xValue))
    .range([0, innerWidth]), [data]);

  const yScale = useMemo(() => scaleLog()
    .domain([epsilon, max(maxDeaths, yValue)])
    .range([innerHeight, 0]), [maxDeaths]);

  const lineGenerator = useMemo(() => line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(epsilon + yValue(d))), [xScale, yScale]);

  const handleVoronoiHover = useCallback(setActiveRow, []);

  return (
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
        <g>
          {
            data.map((countryData) => (
              <path
                className={classes.country}
                key={countryData.countryName}
                d={lineGenerator(countryData)}
              />
            ))
          }
        </g>
        { activeRow
          ? (
            <>
              <path
                className={classes.activeCountry}
                d={lineGenerator(data.find((d) => d.countryName === activeRow.countryName))}
              />
              <circle
                cx={lineGenerator.x()(activeRow)}
                cy={lineGenerator.y()(activeRow)}
                r={4}
              />
            </>
          ) : null
        }
        <text className={classes.chartLabel}>Coronavirus Global Deaths Over Time</text>
        <text
          className={classes.yAxisLabel}
          transform={`translate(-48, ${(innerHeight / 2)}) rotate(-90)`}
          textAnchor={'middle'}
        >Cumulative Deaths</text>
        <VoronoiOverlay
          width={innerWidth}
          height={innerHeight}
          data={allData}
          lineGenerator={lineGenerator}
          handleVoronoiHover={handleVoronoiHover}
        />
      </g>
    </svg>
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  maxDeaths: PropTypes.array.isRequired,
};

export {LineChart};
