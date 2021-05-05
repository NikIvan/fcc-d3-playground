import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {geoNaturalEarth1, geoPath, geoGraticule} from 'd3';

import classes from './WorldMap.scss';
import {Countries} from './Countries.jsx';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

function Marks({
  worldAtlas = {},
  data,
  colorScale,
  colorValue,
  rowByNumericCode,
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
      <Countries
        path={path}
        countries={countries}
        colorScale={colorScale}
        colorValue={colorValue}
        data={data}
        rowByNumericCode={rowByNumericCode}
      />
      <path d={interiorsPath} className={classes.interiors} />
    </g>
  );
}

Marks.propTypes = {
  worldAtlas: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  colorScale: PropTypes.func.isRequired,
  colorValue: PropTypes.func.isRequired,
  rowByNumericCode: PropTypes.object.isRequired,

};

export {Marks};
