import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import * as paths from './paths';
import Header from './components/Layout/Header';
import Menu from './components/Layout/Menu';
import MainContent from './components/Layout/MainContent';
import Footer from './components/Layout/Footer';
import All from './RepoList/All';
import Favourites from './RepoList/Favourites';

function App() {
  return (
    <Router>
      <Header />
      <Menu />
      <MainContent>
        <Switch>
          <Route exact path={paths.HOME}>
            <All />
          </Route>
          <Route exact path={paths.FAVOURITES}>
            <Favourites />
          </Route>
        </Switch>
      </MainContent>
      <Footer />
    </Router>
  );
}

export default App;
