//register user
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import { GET_ERRORS , SET_CURRENT_USER } from "./types"


export const registerUser=(userData , history)=>dispatch=>{
    axios.post('/api/users/register', userData)
    .then(res=>Swal.fire(
        'Registered Successfully!',
        'Let the journey begin!',
        'success'
      ))
    .then(res=>history.push('/login')) 
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })) 
}

// Login :Get User Token

export const loginUser=(userData)=>dispatch=>{
 axios.post('/api/users/login',userData)
 .then(res=>{ 
        //save to localstorage
        const {token}=res.data
        //set token to ls
        localStorage.setItem('jwtToken',token)
        //set token to auth header
        setAuthToken(token)
        //decode token to get user data
        const decoded = jwt_decode(token) 
        // set current user
        dispatch(setCurrentUser(decoded))

 })
 .catch(err=>
    dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// set logged in user
export const setCurrentUser=decoded=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
        }
}

//set the logout
export const logoutUser=()=>dispatch=>{
    //remove token from localStorage
    localStorage.removeItem('jwtToken')
    //remove auth header for future requests
    setAuthToken(false)
    //SetCurrent user to {} wich will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}
