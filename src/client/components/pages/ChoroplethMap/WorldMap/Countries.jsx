import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import classes from './WorldMap.scss';

const missingDataCountryColor = 'white';

const Countries = ({
  path,
  countries,
  colorScale,
  colorValue,
  rowByNumericCode,
}) => useMemo(() => {
  return (<>
    {countries.features.map((feature, i) => {
      const countryData = rowByNumericCode.get(feature.id);

      return (
        <path
          d={path(feature)}
          fill={countryData ? colorScale(colorValue(countryData)) : missingDataCountryColor}
          key={i}
          className={classes.country}
        />
      );
    })}
  </>);
}, [countries, path]);

Countries.propTypes = {
  countries: PropTypes.object.isRequired,
  path: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  colorScale: PropTypes.func.isRequired,
  colorValue: PropTypes.func.isRequired,
  rowByNumericCode: PropTypes.object.isRequired,
};

export {Countries};
