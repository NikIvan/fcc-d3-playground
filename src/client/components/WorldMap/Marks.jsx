import React from 'react';
import PropTypes from 'prop-types';
import {geoNaturalEarth1, geoPath, geoGraticule} from 'd3';

import classes from './WorldMap.scss';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

function Marks({data}) {
  return (
    <g className={classes.marks}>
      <path d={path({type: 'Sphere'})} className={classes.sphere} />
      <path d={path(graticules())} className={classes.graticules} />
      {data.countries.features.map((feature, i) => (
        <path d={path(feature)} key={i} className={classes.country} />
      ))}
      <path d={path(data.interiors)} className={classes.interiors} />
    </g>
  );
}

Marks.propTypes = {
  data: PropTypes.object.isRequired,
};

export {Marks};
