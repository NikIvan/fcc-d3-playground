import React from 'react';
import {
  scaleSqrt,
  max,
} from 'd3';

import {ChartPage} from '../../layout/ChartPage.jsx';
import {useMissingMigrantsData} from '../../../hooks/useMissingMigrantsData';
import {Histogram} from './Historgram/Histogram.jsx';
import {MigrantsMap} from './MigrantsMap/MigrantsMap.jsx';
import {useWorldAtlas} from '../../../hooks/useWorldAtlas';

const width = 960;
const height = 500;

function MissingMigrants() {
  const [missingMigrantsData, isMissingMigrantsDataLoaded] = useMissingMigrantsData();
  const [worldAtlasData, isWorldAtlasDataLoaded] = useWorldAtlas();

  if (missingMigrantsData.length === 0) {
    if (isMissingMigrantsDataLoaded) {
      return (<ChartPage>No data</ChartPage>);
    }

    return (<ChartPage>Loading...</ChartPage>);
  }

  return (
    <ChartPage>
      <svg width={width} height={height}>
        <MigrantsMap
          worldAtlas={worldAtlasData}
          migrantsData={missingMigrantsData}
        />
        <Histogram
          data={missingMigrantsData}
          width={width}
          height={height}
        />
      </svg>
    </ChartPage>
  );
}

export {MissingMigrants};
