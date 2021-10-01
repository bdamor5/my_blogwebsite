// import userModel from '../db/userSchema.js'
// import bcrypt from 'bcryptjs'

const userModel = require('../db/userSchema')

const bcrypt = require('bcryptjs')

const Signup = async(req,res) => {
    try{
        const userpresent = await userModel.findOne({email : req.body.email})
        // console.log(userpresent)
        
        if(userpresent){
            res.status(205).json({message : 'User Already Presents'})
            
        }else{
            const user = new userModel(req.body)

            await user.save()

            res.status(201).json({message : 'User Created!'}) 
        }   

    }catch(err){
        res.status(400).json({message : err.message})
    }
}

const Signin = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(user){

            var checkPw = bcrypt.compareSync(password,user.password)
            // console.log(checkPw)            
            
            if(checkPw){

                const usertoken = await user.generateToken()

                res.cookie('jwtlogin' , usertoken , {
                    expires : new Date(Date.now() + 300000), //5 min = 300000 => 300s
                    sameSite : 'none',
                    secure : true
                })
                res.status(200).json({message : 'User Signed In'})

            }else{

                res.status(400).json({message : 'Invalid Signin Details'})
                
            }
        }else{
            res.status(400).json({message : 'Invalid Signin Details'})
            
        }        

    }catch(err){
        res.status(400).json({message : err.message})
        
    }
}

const allUsers = async(req,res) =>{
    try{
            const allusers = await userModel.find({})

            res.status(200).json(allusers);

    }catch(err){
        res.status(400).json({message : err.message})
    }
}

const userprofile = async(req,res) =>{
    try{
        const user = await userModel.findById(req.params.id);

        res.status(200).json(user);

    }catch(err){
        res.status(400).json({message : err.message})
    }
}

const updateProfile = async(req,res) =>{
    try{
        var {username,age,email,password} = req.body
        
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{username,age,email},{
                new:true
            })

            res.status(201).json(updatedUser);         

    }catch(err){
        res.status(400).json({message : err.message})

    }
}

const updateProfilePassword = async(req,res) =>{
    try {
        var password = req.body.pw

        const user = await userModel.findById(req.params.id);

        // console.log(password)
        // console.log(user.password)

        var check = bcrypt.compareSync(password ,user.password)
        //the compareSync() method which unlike the compare() function returns a Boolean value(true/false). Its first parameter is the unhashed password entered by the user in the login form and the second parameter is the hashed password stored in the db or a string.
        
        // console.log(check) //true if frontend pw matches with hashed pw stored in db else false
        
         if(check){
            res.status(203).json({message : 'Same password as before'})
        }else{

            password = await bcrypt.hash(password,10)

            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{password},{
                new:true
            })

            // console.log(updatedUser)

            res.status(200).json({message : 'password updated'})
        }       
        
        
    } catch (err) {
        res.status(400).json({message : err.message})
    }
}

const deleteProfile = async(req,res) =>{
    try{
        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedUser)
    }catch(err){
        res.status(400).json({message : err.message})

    }
}

const userSignedInProfile = async(req,res) =>{
    res.json(req.tokenuser)
}

const Signout = async(req,res) =>{
    try{

        res.clearCookie('jwtlogin', {path:'/'});

        await req.tokenuser.save()

        res.status(200).json({message:'Signout Successful!'}) 

    }catch(err){
        res.status(400).send(err)
    }
}

module.exports = {
    Signup,
    Signin,
    allUsers,
    userprofile,
    deleteProfile,
    updateProfile,
    updateProfilePassword,
    userSignedInProfile,
    Signout    
}