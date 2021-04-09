import React from 'react';
import PropTypes from 'prop-types';

import classes from './LineChart.scss';

const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickLabelOffset = 5,
}) => xScale
  .ticks()
  .map((tickValue) => (
    <g className={classes.tick} key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={innerHeight}
      />
      <text
        style={{textAnchor: 'middle'}}
        y={innerHeight + 6 + tickLabelOffset}
        dy="0.71em"
      >{tickFormat(tickValue)}</text>
    </g>));

AxisBottom.propTypes = {
  xScale: PropTypes.func.isRequired,
  innerHeight: PropTypes.number.isRequired,
  tickFormat: PropTypes.func.isRequired,
  tickLabelOffset: PropTypes.number,
};

export {AxisBottom};
