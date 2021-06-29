import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  select,
  axisBottom,
  timeMonth,
} from 'd3';

import classes from './CovidChart.scss';

function XAxis({xScale, height, xAxisFormatter}) {
  const ref = useRef();

  useEffect(() => {
    const xAxisG = select(ref.current);

    const xAxis = axisBottom(xScale)
      .tickSize(-height)
      .ticks(timeMonth.every(2))
      .tickFormat(xAxisFormatter)
      .tickPadding(8);

    xAxisG.call(xAxis);
  }, [xScale, height, xAxisFormatter]);

  return (
    <g
      className={classes.xAxis}
      ref={ref}
      transform={`translate(0, ${height})`}
    />
  );
}

XAxis.propTypes = {
  xScale: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  xAxisFormatter: PropTypes.func.isRequired,
};

export {XAxis};
