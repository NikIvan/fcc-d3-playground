import React from 'react';
import PropTypes from 'prop-types';
import {geoNaturalEarth1, geoPath, geoGraticule} from 'd3';

import classes from './MigrantsMap.scss';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

function MigrantsMap({
  worldAtlas,
  migrantsData,
  sizeScale,
  sizeValue,
}) {
  const {countries, interiors} = worldAtlas;

  console.log(migrantsData[0]);

  return (
    <g className={classes.marks}>
      <path d={path({type: 'Sphere'})} className={classes.sphere} />
      <path d={path(graticules())} className={classes.graticules} />
      {countries.features.map((feature, i) => (
        <path d={path(feature)} key={i} className={classes.country} />
      ))}
      <path d={path(interiors)} className={classes.interiors} />
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

MigrantsMap.propTypes = {
  worldAtlas: PropTypes.object.isRequired,
  migrantsData: PropTypes.array.isRequired,
  sizeScale: PropTypes.func.isRequired,
  sizeValue: PropTypes.func.isRequired,

};

export {MigrantsMap};
