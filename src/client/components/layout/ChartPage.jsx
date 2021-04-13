import React from 'react';
import PropTypes from 'prop-types';

import classes from './ChartPage.scss';

function ChartPage({children}) {
  return (
    <div className={classes.pageContainer}>
      {children}
    </div>
  );
}

ChartPage.propTypes = {
  children: PropTypes.node,
};

export {ChartPage};
