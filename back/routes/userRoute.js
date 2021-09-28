const express = require('express')
const router = express.Router();

const userCon = require('../controllers/userControllers')

const auth = require('../middlewares/auth')

router.post('/signup', userCon.Signup)

router.post('/signin' , userCon.Signin)

router.get('/allusers',userCon.allUsers)

// router.get('/profile/:id',auth,userprofile)

router.put('/profile/update/:id',auth,userCon.updateProfile)

router.delete('/profile/delete/:id',auth,userCon.deleteProfile)

router.get('/userSignedInProfile',auth,userCon.userSignedInProfile)

router.get('/signout',auth,userCon.Signout)

module.exports = router