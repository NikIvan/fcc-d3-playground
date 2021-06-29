import React from 'react';
import {LineChart} from './LineChart.jsx';
import {useCovidData} from './useCovidData.js';
import {ChartPage} from '../../layout/ChartPage.jsx';

function CovidChart() {
  const {data, isDataLoading, maxDeaths} = useCovidData();
  let content;

  if (isDataLoading) {
    content = (<div>Loading...</div>);
  } else if (data.length === 0) {
    content = (<div>No data</div>);
  } else {
    content = (
      <LineChart
        data={data}
        maxDeaths={maxDeaths}
      />
    );
  }

  return (
    <ChartPage>
      {content}
    </ChartPage>
  );
}

export {CovidChart};
