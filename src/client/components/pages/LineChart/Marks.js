import React from 'react';
import PropTypes from 'prop-types';
import {line, curveNatural} from 'd3';

import classes from './LineChart.scss';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius = 10,
}) => {
  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(curveNatural);

  return (
    <g className={classes.mark}>
    <path
      d={lineGenerator(data)}
    />
      {data
        .map((d, i) => <circle
          key={i}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        >
          <title>{tooltipFormat(xValue(d))}</title>
        </circle>)
      }
    </g>
  );
};

Marks.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  xValue: PropTypes.func.isRequired,
  yValue: PropTypes.func.isRequired,
  tooltipFormat: PropTypes.func.isRequired,
  circleRadius: PropTypes.number,
};
