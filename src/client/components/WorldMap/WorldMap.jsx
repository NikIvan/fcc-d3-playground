import React from 'react';
import {useWorldAtlas} from './useWorldAtlas';

import {Marks} from './Marks.jsx';
import {ChartPage} from '../layout/ChartPage.jsx';

const width = 960;
const height = 500;

function WorldMap() {
  const [worldAtlasData, isWorldAtlasLoaded] = useWorldAtlas();

  if (!isWorldAtlasLoaded) {
    return (
      <div>Loading...</div>
    );
  }

  if (worldAtlasData.countries.length === 0) {
    return (
      <div>No data</div>
    );
  }

  return (
    <ChartPage>
      <svg width={width} height={height}>
        <Marks data={worldAtlasData} />
      </svg>
    </ChartPage>
  );
}

export {WorldMap};
