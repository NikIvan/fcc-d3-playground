import React from 'react';
import PropTypes from 'prop-types';

import classes from './MissingMigrants.scss';

const AxisLeft = ({yScale, innerWidth, tickLabelOffset = 10}) => yScale
  .ticks()
  .map((tickValue, i) => (
    <g className={classes.tick} key={i} transform={`translate(0, ${yScale(tickValue)})`}>
      <line
        x1={0}
        y1={0}
        x2={innerWidth}
        y2={0}
      />
      <text
        x={-tickLabelOffset}
        dy="0.32em"
        style={{textAnchor: 'end'}}
      >{tickValue}</text>
    </g>));

AxisLeft.propTypes = {
  yScale: PropTypes.func.isRequired,
  innerWidth: PropTypes.number.isRequired,
  tickLabelOffset: PropTypes.number,
};

export {AxisLeft};
