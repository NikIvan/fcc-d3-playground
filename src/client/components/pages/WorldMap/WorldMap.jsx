import React from 'react';

import {scaleSqrt, max} from 'd3';

import {Marks} from './Marks.jsx';
import {ChartPage} from '../../layout/ChartPage.jsx';

import {useWorldAtlas} from '../../../hooks/useWorldAtlas';
import {useWorldCities} from '../../../hooks/useWorldCities';

const width = 960;
const height = 500;

const sizeValue = (d) => d.population;
const maxRadius = 12;

function WorldMap() {
  const [worldAtlas, isWorldAtlasLoaded] = useWorldAtlas();
  const [worldCities, isWorldCitiesLoaded] = useWorldCities();

  if (!isWorldAtlasLoaded || !isWorldCitiesLoaded) {
    return (
      <div>Loading...</div>
    );
  }

  if (worldAtlas.countries.length === 0) {
    return (
      <div>No data</div>
    );
  }

  const sizeScale = scaleSqrt()
    .domain([0, max(worldCities, sizeValue)])
    .range([0, maxRadius]);

  return (
    <ChartPage>
      <svg width={width} height={height}>
        <Marks
          worldAtlas={worldAtlas}
          worldCities={worldCities}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
      </svg>
    </ChartPage>
  );
}

export {WorldMap};
