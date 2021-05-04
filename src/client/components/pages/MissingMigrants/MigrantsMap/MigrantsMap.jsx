import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {max, scaleSqrt} from 'd3';

import {Marks} from './Marks.jsx';

const mapLocationValue = (d) => d.totalDeadAndMissing;
const maxRadius = 20;

function MigrantsMap({
  worldAtlas,
  data,
  filteredData,
}) {
  const mapLocationScale = useMemo(
    () => scaleSqrt()
      .domain([0, max(data, mapLocationValue)])
      .range([0, maxRadius]),
    [data]
  );

  return (
    <Marks
      migrantsData={filteredData}
      worldAtlas={worldAtlas}
      sizeScale={mapLocationScale}
      sizeValue={mapLocationValue}
    />
  );
}

MigrantsMap.propTypes = {
  worldAtlas: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  filteredData: PropTypes.array.isRequired,
};

export {MigrantsMap};
