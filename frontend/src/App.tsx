import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

// Pages
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import UserPlaces from './places/pages/UserPlaces';


function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact={true}>
            <Users/>
          </Route>
          <Route path="/:userId/places" exact={true}>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact={true}>
            <NewPlaces />
          </Route>
          <Redirect to="/" />
        </Switch>  
      </main>
    </Router>
  );
}

export default App;