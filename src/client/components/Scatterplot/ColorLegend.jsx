import React from 'react';
import PropTypes from 'prop-types';

import classes from './Scatterplot.scss';

const defaultEventListener = () => {};

function ColorLegend({
  colorScale,
  tickSpacing = 25,
  tickSize = 10,
  tickTextOffset = 45,
  onMouseEnter = defaultEventListener,
  onMouseLeave = defaultEventListener,
}) {
  return colorScale.domain().map((domainValue, i) => (
    <g
      transform={`translate(0, ${i * tickSpacing})`}
      key={domainValue}
      className={classes.tick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-value={domainValue}
    >
      <circle
        cx={30}
        r={tickSize}
        fill={colorScale(domainValue)}
      />
      <text
        x={tickTextOffset}
        dy="0.32em"
      >
        {domainValue}
      </text>
    </g>
  ));
}

ColorLegend.propTypes = {
  colorScale: PropTypes.func.isRequired,
  tickSpacing: PropTypes.number,
  tickSize: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export {ColorLegend};
