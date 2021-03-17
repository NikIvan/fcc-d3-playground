import React from 'react';
import PropTypes from 'prop-types';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
}) => data
  .map((d) => <rect
    key={d.Country}
    x={0}
    y={yScale(yValue(d))}
    width={xScale(xValue(d))}
    height={yScale.bandwidth()}
  />);

Marks.propTypes = {
  data: PropTypes.array,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  xValue: PropTypes.func,
  yValue: PropTypes.func,
};
