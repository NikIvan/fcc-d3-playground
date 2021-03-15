import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div>
      <Link to="/color-pie">Color Pie</Link>
      <Link to="/bar-chart">Bar Chart</Link>
    </div>
  );
}

export {Header};
