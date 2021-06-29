import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Delaunay} from 'd3';
import {debounce} from 'underscore';

import classes from './CovidChart.scss';

const VoronoiOverlay = ({
  width,
  height,
  lineGenerator,
  data,
  handleVoronoiHover,
}) => useMemo(() => {
  const points = data.map((d) => [lineGenerator.x()(d), lineGenerator.y()(d)]);
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  const onMouseEnter = debounce((event) => {
    const index = event.target.getAttribute('data-index');
    const el = data[index];
    handleVoronoiHover(el);
  }, 50);

  return (
    <g className={classes.voronoi}>
      {points.map((point, i) => (
        <path
          onMouseEnter={onMouseEnter}
          className={classes.voronoiCell}
          data-index={i}
          key={i}
          d={voronoi.renderCell(i)}
        />
      ))}
    </g>
  );
}, [
  width,
  height,
  lineGenerator,
  data,
  handleVoronoiHover,
]);

VoronoiOverlay.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  lineGenerator: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  handleVoronoiHover: PropTypes.func.isRequired,
};

export {VoronoiOverlay};
