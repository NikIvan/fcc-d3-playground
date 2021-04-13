import React from 'react';
import {useData} from './useData';

import {Marks} from './Marks.jsx';
import {ChartPage} from '../layout/ChartPage.jsx';

const width = 960;
const height = 500;

function WorldMap() {
  const [data, isDataLoaded] = useData();

  if (!isDataLoaded) {
    return (
      <div>Loading...</div>
    );
  }

  if (data.countries.length === 0) {
    return (
      <div>No data</div>
    );
  }

  return (
    <ChartPage>
      <svg width={width} height={height}>
        <Marks data={data} />
      </svg>
    </ChartPage>
  );
}

export {WorldMap};
