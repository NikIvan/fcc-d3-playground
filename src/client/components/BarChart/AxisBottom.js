import React from 'react';
import PropTypes from 'prop-types';

export const AxisBottom = ({xScale, innerHeight}) => xScale
  .ticks()
  .map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={innerHeight}
        stroke="black"
      />
      <text
        style={{textAnchor: 'middle'}}
        y={innerHeight + 6}
        dy="0.71em"
      >{tickValue}</text>
    </g>));

AxisBottom.propTypes = {
  xScale: PropTypes.func,
  innerHeight: PropTypes.number,
};
