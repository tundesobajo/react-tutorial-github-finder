import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import GithubContext from './context/github/githubContext';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layouts/Navbar';
import User from './components/users/User';
import Home from './components/pages/Home';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import './App.css';

const App = () => {
  const githubContext = useContext(GithubContext);
  // Load users on startup
  useEffect(() => {
    // console.log(githubContext);
    // githubContext.getUsers(); // FIXEME: githubContext is null. May be because App component is not nested in GithubState
    // eslint-disable-next-line
  }, []);
  // Empty search alert

  // Component render
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
