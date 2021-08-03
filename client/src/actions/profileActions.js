import axios from 'axios'
import { 
    GET_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER, 
    GET_PROFILES
     } from './types'

//Get current default
export const getCurrentProfile=()=>dispatch=>{
    dispatch(setProfileLoading())
    axios.get('/api/profile')
    .then(res=> 
        dispatch({
            type:GET_PROFILE,
            payload: res.data

        }))
        .catch(err=>
            dispatch({
                type: GET_PROFILE,
                payload:{}
            }))
}
///Get Profile by Handle
export const getProfileByHandle=(handle)=>dispatch=>{
    dispatch(setProfileLoading())
    axios
    .get(`/api/profile/handle/${handle}`)
    .then(res=>
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        }))
    
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:null
        }))
}


//Get All Profiles
export const getProfiles=()=>dispatch=>{
    dispatch(setProfileLoading())
    axios.get('/api/profile/all')
    .then(res=> 
        dispatch({
            type:GET_PROFILES,
            payload: res.data

        }))
    .catch(err=>
        dispatch({
        type: GET_PROFILES,
        payload:null
            }))
}


//create profile
export const createProfile=(profileData,history)=>dispatch=>{
    axios
    .post('/api/profile', profileData)
    .then((res) =>history.push('/dashboard'))
    .catch(err =>
        dispatch({
            type :GET_ERRORS,
            payload: err.response.data
        }))
}

//Add experience
export const addExperience=(expData, history)=>dispatch=>{
axios
.post('/api/profile/experience', expData)
.then(res=>history.push('/dashboard'))
.catch(err=>
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}

//Add education
export const addEducation=(eduData, history)=>dispatch=>{
    axios
    .post('/api/profile/education', eduData)
    .then(res=>history.push('/dashboard'))
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
    }

//Delete education
export const deleteExperience=(id)=>dispatch=>{
    axios
    .delete(`/api/profile/experience/${id}`)
    .then(res=>dispatch({
        type:GET_PROFILE,
        payload: res.data
    }))
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
    } 
    
//Delete education
export const deleteEducation=(id)=>dispatch=>{
    axios
    .delete(`/api/profile/education/${id}`)
    .then(res=>dispatch({
        type:GET_PROFILE,
        payload: res.data
    }))
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
    }     


//Delete account & profile
export const deleteAccount=()=>dispatch=>{
    if(window.confirm('Are you sure ? This cannot be undone!'))
    axios
    .delete('/api/profile')
    .then(res=>
        dispatch({
            type:SET_CURRENT_USER,
            payload:{}
        }))
    .catch(err=>
        dispatch({
        type:GET_ERRORS,
        payload: err.res.data
            }))    
}

//Profile loading:
export const setProfileLoading=()=>{
    return {
        type:PROFILE_LOADING
    }
}

//Clear Profile:
export const clearCurrentProfile=()=>{
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}