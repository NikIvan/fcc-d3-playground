import React from 'react';
import PropTypes from 'prop-types';

import classes from './Histogram.scss';

export const Marks = ({
  data,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
}) => (
  <g className={classes.mark}>
    {data
      .map((d, i) => <rect
        key={i}
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{tooltipFormat(d.y)}</title>
      </rect>)
    }
  </g>
);

Marks.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  innerHeight: PropTypes.number.isRequired,
  tooltipFormat: PropTypes.func.isRequired,
};
