import React, {useReducer} from 'react';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {SEARCH_USERS, CLEAR_USERS, GET_REPOS, GET_USER, SET_LOADING} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search Users
  const searchUsers = async text => {
    setLoading();
    await fetch(`https://api.github.com/search/users?q=${text}&` +
      `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
      `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(response => response.json())
      .then(data => {
        dispatch({type: SEARCH_USERS, payload: data.items})
      })
  };

  //get user
  const getUser = async username => {
    setLoading();
    await fetch(`https://api.github.com/users/${username}?` +
      `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
      `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(response => response.json())
      .then(data => dispatch({ type: GET_USER, payload: data }))
  };

  //get Repos
  const getUserRepos = async username => {
    setLoading();
    await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&` +
      `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
      `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(response => response.json())
      .then(data => dispatch({ type: GET_REPOS, payload: data}));
  };

  //clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //setloading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
};

export default GithubState;