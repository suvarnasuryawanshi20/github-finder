import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props =>{
    const initialState =
    {
        users:[],
        user:{},
        repos:[],
        loading:false
    }

    const [state,dispatch]= useReducer(GithubReducer,initialState);

    //Search user
    const searchUsers= async text =>{
    console.log(text);
    setLoading();
    const res = await axios
    .get(`https://api.github.com/search/users?q=${text} & client_id = 
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    console.log(res.data.items); 
  dispatch({
      type:SEARCH_USERS,
      payload:res.data
  });
       
  }

    //Get User

    //Get repos

    //Clear Users

    //Set Alert

    //Set Loaading
    const setLoading = () => dispatch({ type:SET_LOADING  })

    return <GithubContext.Provider 
        value={{
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading
        }}
    >
        {props.children}
        </GithubContext.Provider>
}

export default GithubState;