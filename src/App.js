import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/pages/homepage/homepage.component';
import Shop from './components/pages/shop/shop.component';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={Shop} />
      </Switch>
    </div>
  );
}

export default App;
