import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  select,
  axisLeft,
} from 'd3';

import classes from './CovidChart.scss';

const YAxis = ({yScale, width}) => {
  const ref = useRef();

  useEffect(() => {
    const yAxisG = select(ref.current);

    const yAxis = axisLeft(yScale)
      .tickSize(-width)
      .tickPadding(8)
      .ticks(10, '~s');

    yAxisG.call(yAxis);
  }, [yScale, width]);

  return (
    <g
      className={classes.yAxis}
      ref={ref}
    />
  );
};

YAxis.propTypes = {
  yScale: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export {YAxis};
