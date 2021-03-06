import React from 'react';
import PropTypes from 'prop-types';
import {geoNaturalEarth1, geoPath, geoGraticule} from 'd3';

import classes from './WorldMap.scss';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

function Marks({
  worldAtlas,
  worldCities,
  sizeScale,
  sizeValue,
}) {
  const {countries, interiors} = worldAtlas;

  return (
    <g className={classes.marks}>
      <path d={path({type: 'Sphere'})} className={classes.sphere} />
      <path d={path(graticules())} className={classes.graticules} />
      {countries.features.map((feature, i) => (
        <path d={path(feature)} key={i} className={classes.country} />
      ))}
      <path d={path(interiors)} className={classes.interiors} />
      {worldCities.map((d, i) => {
        const [x, y] = projection([d.lng, d.lat]);
        const name = d.city;

        return (
          <circle
            key={name + i}
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
  worldCities: PropTypes.array.isRequired,
  sizeScale: PropTypes.func.isRequired,
  sizeValue: PropTypes.func.isRequired,

};

export {Marks};
