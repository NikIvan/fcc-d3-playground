import React from 'react';
import PropTypes from 'prop-types';

import classes from './Scatterplot.scss';

function ColorLegend({
  colorScale,
  tickSpacing = 25,
  tickSize = 10,
  tickTextOffset = 45,
}) {
  return colorScale.domain().map((domainValue, i) => (
    <g
      transform={`translate(0, ${i * tickSpacing})`}
      key={domainValue}
      className={classes.tick}
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
};

export {ColorLegend};
