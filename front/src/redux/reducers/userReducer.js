import {USER_SIGNUP_PENDING,USER_SIGNUP_SUCCESS,USER_SIGNUP_FAILED, USER_SIGNIN_PENDING, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNEDIN, USER_NOT_SIGNEDIN, USER_EDITPROFILE_PENDING, USER_EDITPROFILE_SUCCESS, USER_EDITPROFILE_FAILED} from '../constants/userConstants'

const initialState = { state : '' }

export const userReducerSignup = (state = initialState , action) =>{
    switch(action.type){
        case USER_SIGNUP_PENDING : 
                    return state
        case USER_SIGNUP_SUCCESS : 
                    return {state : action.payload}
        case USER_SIGNUP_FAILED : 
                    return {state : action.payload}
        default : return state
    }
}

export const userReducerSignin = (state = initialState , action) =>{
    switch(action.type){
        case USER_SIGNIN_PENDING : 
                    return state
        case USER_SIGNIN_SUCCESS : 
                    return {state : action.payload}
        case USER_SIGNIN_FAILED : 
                    return {state : action.payload}
        default : return state
    }
}

export const userSignedinProfile = (state = initialState , action) =>{
    switch(action.type){
        case USER_SIGNEDIN : 
            return {state : action.payload}
        case USER_NOT_SIGNEDIN : 
            return {state : action.payload}
        default : return state 
    }
}

export const userEditProfile = (state = initialState , action) =>{
    switch(action.type){
        case USER_EDITPROFILE_PENDING : 
                    return state
        case USER_EDITPROFILE_SUCCESS : 
                    return {state : action.payload}
        case USER_EDITPROFILE_FAILED : 
                    return {state : action.payload}
        default : return state
    }
}