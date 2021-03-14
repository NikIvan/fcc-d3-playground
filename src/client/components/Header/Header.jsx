import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div>
      <Link to="/color-pie">Color Pie</Link>
    </div>
  );
}

export {Header};
