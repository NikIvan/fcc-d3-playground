import React, {useEffect, useState} from 'react';

import {ChartPage} from '../../layout/ChartPage.jsx';
import {useMissingMigrantsData} from '../../../hooks/useMissingMigrantsData';
import {Histogram} from './Historgram/Histogram.jsx';
import {MigrantsMap} from './MigrantsMap/MigrantsMap.jsx';
import {useWorldAtlas} from '../../../hooks/useWorldAtlas';

const width = 960;
const height = 500;
const xValue = (d) => d.reportedDate;

function MissingMigrants() {
  const [missingMigrantsData, isMissingMigrantsDataLoaded] = useMissingMigrantsData();
  const [worldAtlasData] = useWorldAtlas();
  const [brushExtent, setBrushExtent] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (brushExtent.length === 0) {
      setFilteredData([...missingMigrantsData]);
    } else {
      setFilteredData(missingMigrantsData.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      }));
    }
  }, [missingMigrantsData, brushExtent]);

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
          filteredData={filteredData}
          data={missingMigrantsData}
        />
        <Histogram
          data={missingMigrantsData}
          width={width}
          height={height}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </svg>
    </ChartPage>
  );
}

export {MissingMigrants};
