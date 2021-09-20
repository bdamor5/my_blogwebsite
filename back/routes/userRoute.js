import express from 'express'
const router = express.Router();

import {Signup,Signin, allUsers, userprofile, updateProfile, deleteProfile, userSignedInProfile, Signout} from '../controllers/userControllers.js'

import {auth} from '../middlewares/auth.js'

router.post('/signup', Signup)

router.post('/signin' , Signin)

router.get('/allusers',allUsers)

// router.get('/profile/:id',auth,userprofile)

router.put('/profile/update/:id',auth,updateProfile)

router.delete('/profile/delete/:id',auth,deleteProfile)

router.get('/userSignedInProfile',auth,userSignedInProfile)

router.get('/signout',auth,Signout)

export default router