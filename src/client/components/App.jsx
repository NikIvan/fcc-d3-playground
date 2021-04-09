import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Header} from './Header';
import {ColorPie} from './ColorPie';
import {BarChart} from './BarChart';
import {Scatterplot} from './Scatterplot/Scatterplot.jsx';
import {LineChart} from './LineChart/LineChart.jsx';
import {WorldMap} from './WorldMap/WorldMap.jsx';
import {NotFound} from './NotFound/NotFound.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/color-pie" component={ColorPie} />
        <Route path="/bar-chart" component={BarChart} />
        <Route path="/scatterplot" component={Scatterplot} />
        <Route path="/line-chart" component={LineChart} />
        <Route path="/world-map" component={WorldMap} />
        <Route path="/not-found" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
