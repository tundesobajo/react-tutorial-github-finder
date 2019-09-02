import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { GET_USER, GET_USERS, SEARCH_USERS, CLEAR_USERS, GET_REPOS, SET_LOADING } from '../types';
import usersData from '../../data/UsersData';

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV !== 'production') {
  githubClientId = REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = GITHUB_CLIENT_ID;
  githubClientSecret = GITHUB_CLIENT_SECRET;
}
const secret = `client_id=${githubClientId}&client_secret=${githubClientSecret}`;

const GithubState = props => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get Single github user
  const getUser = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?${secret}`);
    dispatch({ type: GET_USER, payload: res.data });
  };
  // Load default user list page
  const getUsers = async () => {
    setLoading();
    // const res = await axios.get(`https://api.github.com/users?${secret}`);
    // dispatch({ type: SEARCH_USERS, payload: res.data.items });
    dispatch({ type: GET_USERS, payload: usersData.data });
  };
  // Get user by search name
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&${secret}`);
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };
  // Clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  // Get github user repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${secret}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  };
  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return <GithubContext.Provider value={{
    user: state.user,
    users: state.users,
    repos: state.repos,
    loading: state.loading,
    searchUsers,
    getUser,
    getUsers,
    clearUsers,
    getUserRepos,
  }}>
    {props.children}
  </GithubContext.Provider>;
};

export default GithubState;
