import React, { Component} from 'react'
import './App.css';
import{ BrowserRouter as Router , Route , Switch} from'react-router-dom'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {logoutUser, setCurrentUser} from './actions/authActions'
import Mynav from './components/layout/Mynav';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import store from './store';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import NotFound from './components/not-found/NotFound';
import Post from './components/post/Post';

if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  //set user and isatuthenticated
  store.dispatch(setCurrentUser(decoded))
  
   //check for expired token 
   const currentTime= Date.now()/1000
   if( decoded.exp < currentTime){
     //logout user
     store.dispatch(logoutUser())
     //clear current user
     store.dispatch(clearCurrentProfile())
     //redirect to login 
     window.location.href='/login'
   }
}
 

 class App extends Component {
  render() {
    return (
    
     <Provider store={store}>
       <Router>
    <div className="App">
      <Mynav/>
       <Switch>       
       <Route exact path='/' component ={Landing}/>       
       <Route exact path='/login' component ={Login}/>
       <Route exact path='/register' component ={Register}/> 
       <Route exact path='/profiles'  component ={Profiles}/>
       <Route exact path='/profile/:handle'  component ={Profile}/>
       <Route exact path='/not-found'  component ={NotFound}/>
               
       <PrivateRoute exact path='/dashboard'  component ={Dashboard}/>       
       <PrivateRoute exact path='/create-profile'  component ={CreateProfile}/> 
       <PrivateRoute exact path='/edit-profile'  component ={EditProfile}/>       
       <PrivateRoute exact path='/add-experience'  component ={AddExperience}/>
       <PrivateRoute exact path='/add-education'  component ={AddEducation}/>
       <PrivateRoute exact path='/feed'  component ={Posts}/>
       <PrivateRoute exact path='/post/:id'  component ={Post}/>

       </Switch>              
      <Footer/>      
    </div>
      </Router>
    </Provider>
      
    )
  }
}

export default App



