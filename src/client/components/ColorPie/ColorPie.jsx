import React, {useEffect, useState} from 'react';
import {csv, pie, arc} from 'd3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const colorsInitialState = [];
colorsInitialState.columns = 0;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width);

function ColorPie() {
  const [colors, setColors] = useState(colorsInitialState);

  useEffect(() => {
    async function getColors() {
      const data = await csv('/database/colors.csv');
      console.dir(data);
      // const data = await response.text();
      setColors(data);
    }

    getColors();
  }, []);

  if (colors.length === 0) {
    return (<pre>Loading...</pre>);
  }

  const colorPie = pie().value(1);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(colors).map((d) => (
          <path
            key={d.data.colorName}
            fill={d.data.colorName}
            d={pieArc(d)}
          />))}
      </g>
    </svg>
  );
}

export { ColorPie };
