import React from 'react';
import PropTypes from 'prop-types';
import {max, scaleSqrt} from 'd3';

import {Marks} from './Marks.jsx';

const mapLocationValue = (d) => d.totalDeadAndMissing;
const maxRadius = 20;

function MigrantsMap({
  worldAtlas,
  migrantsData,
}) {
  const mapLocationScale = scaleSqrt()
    .domain([0, max(migrantsData, mapLocationValue)])
    .range([0, maxRadius]);

  return (
    <Marks
      migrantsData={migrantsData}
      worldAtlas={worldAtlas}
      sizeScale={mapLocationScale}
      sizeValue={mapLocationValue}
    />
  );
}

MigrantsMap.propTypes = {
  worldAtlas: PropTypes.object.isRequired,
  migrantsData: PropTypes.array.isRequired,
};

export {MigrantsMap};
