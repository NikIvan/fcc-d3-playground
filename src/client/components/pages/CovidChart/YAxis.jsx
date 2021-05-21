import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  select,
  axisLeft,
} from 'd3';

import classes from './CovidChart.scss';

function YAxis({yScale, width}) {
  const ref = useRef();

  useEffect(() => {
    const yAxisG = select(ref.current);

    const yAxis = axisLeft(yScale)
      .tickSize(-width)
      .ticks(12, '~s')
      .tickPadding(8);

    yAxisG.call(yAxis);
  }, []);

  return (
    <g
      className={classes.yAxis}
      ref={ref}
    />
  );
}

YAxis.propTypes = {
  yScale: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export {YAxis};
