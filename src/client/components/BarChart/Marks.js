import React from 'react';
import PropTypes from 'prop-types';
import classes from './BarChart.scss';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) => data
  .map((d) => <rect
    className={classes.mark}
    key={d.Country}
    x={0}
    y={yScale(yValue(d))}
    width={xScale(xValue(d))}
    height={yScale.bandwidth()}
  >
    <title>{tooltipFormat(xValue(d))}</title>
  </rect>);

Marks.propTypes = {
  data: PropTypes.array,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  xValue: PropTypes.func,
  yValue: PropTypes.func,
  tooltipFormat: PropTypes.func,
};
