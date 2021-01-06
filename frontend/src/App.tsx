import React, { useState, useCallback } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

// Pages
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';

import { AuthContext } from './shared/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [])

  return (
    <AuthContext.Provider 
      value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}
    >
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

            <Route path="/places/:placeId">
              <UpdatePlace />
            </Route>
            
            <Route path="/auth">
              <Auth />
            </Route>

            <Redirect to="/" />
          </Switch>  
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;