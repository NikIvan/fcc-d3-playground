import React from 'react';
import PropTypes from 'prop-types';
import classes from './Scatterplot.scss';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius = 10,
}) => data
  .map((d, i) => <circle
    className={classes.mark}
    key={i}
    cx={xScale(xValue(d))}
    cy={yScale(yValue(d))}
    r={circleRadius}
  >
    <title>{tooltipFormat(xValue(d))}</title>
  </circle>);

Marks.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  xValue: PropTypes.func.isRequired,
  yValue: PropTypes.func.isRequired,
  tooltipFormat: PropTypes.func.isRequired,
  circleRadius: PropTypes.number,
};
