import axios from 'axios'
import {USER_SIGNUP_PENDING,USER_SIGNUP_SUCCESS,USER_SIGNUP_FAILED, USER_SIGNIN_PENDING, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNEDIN, USER_NOT_SIGNEDIN, USER_EDITPROFILE_SUCCESS, USER_EDITPROFILE_FAILED, USER_EDITPROFILE_PENDING} from '../constants/userConstants'

export const userSignup = (userInfo) => async(dispatch,getState) => {
    try{

        dispatch({type: USER_SIGNUP_PENDING})

        var res = await axios.post('http://localhost:8000/user/signup',userInfo,{withCredentials : true})

        // console.log('2' , res.status)
        dispatch({type : USER_SIGNUP_SUCCESS , payload : res.status})
    }catch(err){
        dispatch({type : USER_SIGNUP_FAILED , payload : res.status})
    }
}

export const userSignin = (userInfo) => async(dispatch,getState) =>{
    try{
        dispatch({type:USER_SIGNIN_PENDING})

       await axios.post('http://localhost:8000/user/signin',userInfo,{withCredentials : true})

        dispatch({type : USER_SIGNIN_SUCCESS , payload : 200})

    }catch(err){
        dispatch({type : USER_SIGNIN_FAILED , payload : 400})
    }
}

export const userSignedInProfile = () => async(dispatch,getState) =>{
    try{
        const response = await axios.get('http://localhost:8000/user/userSignedInProfile',{withCredentials : true})

        dispatch({type : USER_SIGNEDIN , payload : response})
    }catch(err){
        dispatch({type : USER_NOT_SIGNEDIN , payload : 400})
    }
}

export const userEditProfile = (id,user) => async(dispatch,getState) =>{
    try{
        dispatch({type:USER_EDITPROFILE_PENDING})

        const response = await axios.put(`http://localhost:8000/user/profile/update/${id}`,user,{withCredentials : true})
        
        dispatch({type : USER_EDITPROFILE_SUCCESS , payload : response})

    }catch(err){
        dispatch({type : USER_EDITPROFILE_FAILED , payload : 400})
    }
}