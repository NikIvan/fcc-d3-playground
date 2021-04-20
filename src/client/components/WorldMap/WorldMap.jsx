import React from 'react';

import {Marks} from './Marks.jsx';
import {ChartPage} from '../layout/ChartPage.jsx';

import {useWorldAtlas} from './useWorldAtlas';
import {useWorldCities} from './useWorldCities';

const width = 960;
const height = 500;

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

  return (
    <ChartPage>
      <svg width={width} height={height}>
        <Marks worldAtlas={worldAtlas} worldCities={worldCities} />
      </svg>
    </ChartPage>
  );
}

export {WorldMap};
