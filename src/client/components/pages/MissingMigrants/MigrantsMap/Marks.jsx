import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {geoNaturalEarth1, geoPath, geoGraticule} from 'd3';

import classes from './MigrantsMap.scss';
import {Countries} from './Countries.jsx';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

function Marks({
  worldAtlas = {},
  migrantsData,
  sizeScale,
  sizeValue,
}) {
  const {countries, interiors} = worldAtlas;

  if (countries == null || interiors == null) {
    return (<g />);
  }

  const interiorsPath = useMemo(() => path(interiors), [path, interiors]);
  const graticulesPath = useMemo(() => path(graticules()), [path, graticules]);
  const spherePath = useMemo(() => path({type: 'Sphere'}), [path]);

  return (
    <g className={classes.marks}>
      <path d={spherePath} className={classes.sphere} />
      <path d={graticulesPath} className={classes.graticules} />
      <Countries path={path} countries={countries} />
      <path d={interiorsPath} className={classes.interiors} />
      {migrantsData.map((d, i) => {
        const [x, y] = projection([d.lng, d.lat]);

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={sizeScale(sizeValue(d))}
            className={classes.city}
          />
        );
      })}
    </g>
  );
}

Marks.propTypes = {
  worldAtlas: PropTypes.object.isRequired,
  migrantsData: PropTypes.array.isRequired,
  sizeScale: PropTypes.func.isRequired,
  sizeValue: PropTypes.func.isRequired,

};

export {Marks};
