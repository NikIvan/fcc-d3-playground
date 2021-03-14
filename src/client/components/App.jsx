import React from 'react';
import {ColorPie} from './ColorPie';
import {Header} from './Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/color-pie" component={ColorPie} />
      </Switch>
    </Router>
  );
}

export default App;
