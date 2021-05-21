import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Header} from './Header/Header.jsx';
import {ColorPie} from './pages/ColorPie/ColorPie.jsx';
import {BarChart} from './pages/BarChart/BarChart.jsx';
import {Scatterplot} from './pages/Scatterplot/Scatterplot.jsx';
import {LineChart} from './pages/LineChart/LineChart.jsx';
import {WorldMap} from './pages/WorldMap/WorldMap.jsx';
import {NotFound} from './pages/NotFound/NotFound.jsx';
import {MenuPage} from './pages/MenuPage/MenuPage.jsx';
import {MissingMigrants} from './pages/MissingMigrants/MissingMigrants.jsx';
import {ChoroplethMap} from './pages/ChoroplethMap/ChoroplethMap.jsx';
import {CovidChart} from './pages/CovidChart/CovidChart.jsx';

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
        <Route path="/choropleth-map" component={ChoroplethMap} />
        <Route path="/covid-chart" component={CovidChart} />
        <Route path="/not-found" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
