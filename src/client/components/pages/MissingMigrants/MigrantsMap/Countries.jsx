import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import classes from './MigrantsMap.scss';

const Countries = ({path, countries}) => useMemo(() => <>
    {countries.features.map((feature, i) => (
      <path d={path(feature)} key={i} className={classes.country} />
    ))}
  </>, [countries, path]);

Countries.propTypes = {
  countries: PropTypes.object.isRequired,
  path: PropTypes.func.isRequired,
};

export {Countries};
