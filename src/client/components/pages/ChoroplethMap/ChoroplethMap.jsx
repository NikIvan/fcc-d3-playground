import React from 'react';

import {useHIVData} from '../../../hooks/useHIVData';
import {useWorldAtlas} from '../../../hooks/useWorldAtlas';
import {useCountryCodes} from '../../../hooks/useCountryCodes';

import {ChartPage} from '../../layout/ChartPage.jsx';
import {WorldMap} from './WorldMap/WorldMap.jsx';

const width = 960;
const height = 500;

const selectedYear = 2017;

const ChoroplethMap = () => {
  const [hivData, isHivDataLoaded] = useHIVData();
  const [worldAtlasData, isWorldAtlasDataLoaded] = useWorldAtlas();
  const [countryCodes, isCountryCodesLoaded] = useCountryCodes();

  if (!isHivDataLoaded || !isWorldAtlasDataLoaded || !isCountryCodesLoaded) {
    return (
      <ChartPage>Loading...</ChartPage>
    );
  }

  if (hivData.length === 0) {
    return (
      <ChartPage>No data</ChartPage>
    );
  }

  const filteredData = hivData.filter((d) => d.Year === selectedYear);

  const numericCodeByAlphaCode = countryCodes.reduce((acc, el) => {
    const alpha3Code = el['alpha-3'];
    const numericCode = el['country-code'];

    acc.set(alpha3Code, numericCode);
    return acc;
  }, new Map());

  const rowByNumericCode = filteredData.reduce((acc, el) => {
    const alpha3Code = el.Code;
    acc.set(numericCodeByAlphaCode.get(alpha3Code), el);
    return acc;
  }, new Map());

  return (
    <ChartPage>
      <h2>HIV/AIDS data in choropleth map</h2>
      <svg width={width} height={height}>
        <WorldMap
          data={filteredData}
          worldAtlas={worldAtlasData}
          rowByNumericCode={rowByNumericCode}
        />
      </svg>
    </ChartPage>
  );
};

export {ChoroplethMap};
