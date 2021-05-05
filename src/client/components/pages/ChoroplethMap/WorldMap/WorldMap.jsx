import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {max, scaleSequential, interpolateYlOrRd} from 'd3';

import {Marks} from './Marks.jsx';

const colorValue = (d) => d.aids;

function WorldMap({
  worldAtlas,
  data,
  rowByNumericCode,
}) {
  const colorScale = useMemo(
    () => scaleSequential(interpolateYlOrRd)
      .domain([0, max(data, colorValue)]),
    [data]
  );

  return (
    <Marks
      data={data}
      worldAtlas={worldAtlas}
      colorScale={colorScale}
      colorValue={colorValue}
      rowByNumericCode={rowByNumericCode}
    />
  );
}

WorldMap.propTypes = {
  worldAtlas: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  rowByNumericCode: PropTypes.object.isRequired,
};

export {WorldMap};
