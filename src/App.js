import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';
import usersData from './data/UsersData';
import './App.css';

const secret = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

const App = () => {
  // Component state
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // Load users on startup
  useEffect(() => {
    setLoading(true);
    // (async () => {
    //   const res = await axios.get(`https://api.github.com/users?${secret}`);
    //   setUsers(res.data)
    // })();
    setUsers(usersData.data);
    setLoading(false);
  }, []);
  // Get user by search name
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&${secret}`);
    setUsers(res.data.items);
    setLoading(false);
  };
  // Get Single github user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?${secret}`);
    setUser(res.data);
    setLoading(false);
  };
  // Get github user repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${secret}`);
    setRepos(res.data);
    setLoading(false);
  };
  // Clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  // Empty search alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };
  // Component render
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} showAlert={showAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User { ...props } getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
