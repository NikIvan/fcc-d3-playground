import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Header} from './Header';
import {ColorPie} from './pages/ColorPie';
import {BarChart} from './pages/BarChart';
import {Scatterplot} from './pages/Scatterplot/Scatterplot.jsx';
import {LineChart} from './pages/LineChart/LineChart.jsx';
import {WorldMap} from './pages/WorldMap/WorldMap.jsx';
import {NotFound} from './pages/NotFound/NotFound.jsx';
import {MenuPage} from './pages/MenuPage/MenuPage.jsx';
import {MissingMigrants} from './pages/MissingMigrants/MissingMigrants.jsx';

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
        <Route path="/menu-page" component={MenuPage} />
        <Route path="/missing-migrants" component={MissingMigrants} />
        <Route path="/not-found" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
