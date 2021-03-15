import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Header} from './Header';
import {ColorPie} from './ColorPie';
import {BarChart} from './BarChart';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/color-pie" component={ColorPie} />
        <Route path="/bar-chart" component={BarChart} />
      </Switch>
    </Router>
  );
}

export default App;
