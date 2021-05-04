import React, {useEffect, useRef, useMemo} from 'react';
import {debounce} from 'underscore';
import PropTypes from 'prop-types';

import {
  bin,
  extent,
  max,
  scaleLinear,
  scaleTime,
  sum,
  timeFormat,
  timeMonths,
  brushX,
  select,
} from 'd3';

import {Marks} from './Marks.jsx';
import {AxisBottom} from './AxisBottom.jsx';
import {AxisLeft} from './AxisLeft.jsx';

import classes from './Histogram.scss';

const margin = {
  top: 20,
  right: 45,
  bottom: 45,
  left: 80,
};

const histogramHeightScale = 0.3;

const xAxisLabel = 'Time';

const yValue = (d) => d.totalDeadAndMissing;
const yAxisLabel = 'Total Dead and Missing';
const yAxisOffset = -55;

const xAxisTickFormat = timeFormat('%Y');
const tooltipFormat = (value) => value;
const getY = (d) => d.y;

export const Histogram = ({
  data,
  width,
  height,
  setBrushExtent,
  xValue,
}) => {
  const brushRef = useRef(null);

  const innerWidth = width - margin.left - margin.right;
  const bgHeight = height * histogramHeightScale;
  const innerHeight = bgHeight - margin.top - margin.bottom;

  const xScale = useMemo(
    () => scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice(),
    [data, xValue, innerWidth]
  );

  const [start, stop] = xScale.domain();

  const binnedData = useMemo(
    () => bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      })),
    [xValue, yValue, xScale, data]
  );

  const yScale = useMemo(
    () => scaleLinear()
      .domain([0, max(binnedData, getY)])
      .range([innerHeight, 0])
      .nice(),
    [binnedData, innerHeight]
  );

  useEffect(() => {
    const onBrushDebounced = debounce((event) => {
      const newBrushExtent = event.selection ? event.selection.map(xScale.invert) : [];
      setBrushExtent(newBrushExtent);
    }, 150);

    const brush = brushX()
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on('brush end', onBrushDebounced);

    brush(select(brushRef.current));
  }, [innerWidth, innerHeight, xScale]);

  return (
    <>
      <rect
        width={width}
        height={bgHeight}
        fill="white"
        opacity="0.8"
        transform={`translate(0, ${height - bgHeight})`}
      />
      <g transform={`translate(${margin.left}, ${height - margin.bottom - innerHeight})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <text
          className={classes.chartTitle}
          x={innerWidth / 2}
          y={innerHeight + margin.bottom / 1.3}
          >{xAxisLabel}</text>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
        />
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
        <g ref={brushRef} />
      </g>
    </>
  );
};

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  setBrushExtent: PropTypes.func.isRequired,
  xValue: PropTypes.func.isRequired,
};
