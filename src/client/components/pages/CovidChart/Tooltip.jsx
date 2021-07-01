import React from 'react';
import PropTypes from 'prop-types';
import {timeFormat} from 'd3';

const tooltipTimeFormatter = timeFormat('%b %d, %y');
const numbersFormatter = new Intl.NumberFormat().format;

const Tooltip = ({
  className,
  activeRow,
  middleDate,
  isOnTop,
}) => {
  const {countryName, totalDeaths, date} = activeRow;
  const textAnchor = (middleDate > date) ? 'start' : 'end';

  return (
    <text
      className={className}
      textAnchor={textAnchor}
      y={isOnTop ? -30 : 30}
    >{countryName}: {numbersFormatter(totalDeaths)} deaths&nbsp;
      on {tooltipTimeFormatter(date)}
    </text>
  );
};

Tooltip.propTypes = {
  className: PropTypes.string,
  activeRow: PropTypes.shape({
    totalDeaths: PropTypes.number,
    countryName: PropTypes.string,
    date: PropTypes.shape(new Date()),
  }),
  middleDate: PropTypes.shape(new Date()).isRequired,
};

export {Tooltip};
