import {useEffect, useState} from 'react';
import {csv} from 'd3';

const irisDataUrl = '/api/v1/iris';
const irisDataInitialState = [];

export const useIrisData = () => {
  const [irisData, setIrisData] = useState(irisDataInitialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function getIrisData() {
      const row = (d) => {
        const newD = {...d};

        newD.petal_length = Number.parseFloat(d.petal_length);
        newD.petal_width = Number.parseFloat(d.petal_width);
        newD.sepal_length = Number.parseFloat(d.sepal_length);
        newD.sepal_width = Number.parseFloat(d.sepal_width);

        return newD;
      };

      const data = await csv(irisDataUrl, row);
      setIrisData(data);
      setIsDataLoaded(true);
    }

    getIrisData();
  }, []);

  return [irisData, isDataLoaded];
};
