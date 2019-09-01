import React, { Fragment, Component } from 'react';
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

class App extends Component {
  // Component state
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }
  // Load users on startup
  async componentDidMount() {
    this.setState({ loading: true });
    // const res = await axios.get(`https://api.github.com/users?${secret}`);
    // this.setState({ users: res.data, loading: false });
    this.setState({ users: usersData.data, loading: false });
  }
  // Get user by search name
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&${secret}`);
    this.setState({ users: res.data.items, loading: false });
  }
  // Get Single github user
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?${secret}`);
    this.setState({ user: res.data, loading: false });
  }
  // Get github user repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${secret}`);
    this.setState({ repos: res.data, loading: false });
  }
  // Clear users
  clearUsers = () => this.setState({ users: [], loading: false });
  // Empty search alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  }
  // Component render
  render() {
    const { loading, user, users, repos, alert } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
