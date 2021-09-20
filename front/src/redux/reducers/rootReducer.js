import {combineReducers} from 'redux'
import {userReducerSignup,userReducerSignin,userSignedinProfile,userEditProfile} from './userReducer'

export const rootReducer = combineReducers({
    userReducerSignup,
    userReducerSignin,
    userSignedinProfile,
    userEditProfile,
})