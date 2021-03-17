import React from 'react';
import PropTypes from 'prop-types';

export const AxisLeft = ({yScale}) => yScale
  .domain()
  .map((tickValue) => (
    <g key={tickValue} transform={`translate(0, ${yScale(tickValue) + yScale.bandwidth() / 2})`}>
      <text
        dx="-0.71em"
        dy="0.32em"
        style={{textAnchor: 'end'}}
      >{tickValue}</text>
    </g>));

AxisLeft.propTypes = {
  yScale: PropTypes.func,
};
