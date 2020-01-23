import React,{Fragment,useState,useEffect} from 'react';
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({});
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState(null);

  // useEffect(async ()=>{

  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //     setLoading(true)
  //     const res = await axios
  //     .get(`https://api.github.com/users?client_id = 
  //     ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //     client_secret= ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //     console.log(res.data);  
  //     setUsers(res.data)
  //     setLoading(false)
      
  // })

  // async componentDidMount (){
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({loading: true})
  //   const res = await axios
  //   .get(`https://api.github.com/users?client_id = 
  //   ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //   client_secret= ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   console.log(res.data);  
  //   this.setState({users:res.data,loading: false});
  // } 

  //Search github users

    const searchUsers= async text =>{
        console.log(text);
    setLoading(true);
    const res = await axios
    .get(`https://api.github.com/search/users?q=${text} & client_id = 
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    console.log(res.data.items); 
    setUsers(res.data.items) ;
    setLoading(false);
   
  }
//Get Single github User

  const getUser = async(username) =>{
    setLoading(true);
    const res = await axios
  .get(`https://api.github.com/users/${username}?client_id = 
  ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret= ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  console.log(res.data);  
  setUser(res.data);
  setLoading(false);
  }

  //Get user Repos
  const getUserRepos = async username =>{
    setLoading(true);
    const res = await axios
  .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id = 
  ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret= ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  console.log(res.data);  
  setRepos(res.data);
  setLoading(false);
  }


  //Clear users from state
    const clearUser = () =>{
      setUser([]);
      setLoading(false);
          
    }

    //Set Alert
    const showAlert =(message,type)=>{
      setAlert({message,type});
      setTimeout(()=> setAlert(null),5000);
    }
  
    return (
      <GithubState>
      <Router>
      <div className = 'App'>
        <Navbar />
        <div className = "container" >
          <Alert  alert={alert}/>
          <Switch>
            <Route
            exact path = '/'
            render = {props =>(
              <Fragment>
              <Search 
                searchUsers={searchUsers}
                clearUser = { clearUser} 
                showClear = {users.length>0 ? true : false }
                setAlert ={showAlert}
                />        
                <Users  loading={loading} users={users}/>
                </Fragment>
            )} />
            <Route exact path='/About' component={About}/>
            <Route exact path ='/user/:login' render={props=>(
              <User {...props}
              getUser ={getUser}
              getUserRepos = {getUserRepos}
              user = {user}
              repos = {repos}
              loading={loading}/>
            )} />
            </Switch>
        
        </div>
      </div>
      </Router>
      </GithubState>
    );

  }
  


export default App;
