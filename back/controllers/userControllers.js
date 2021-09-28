// import userModel from '../db/userSchema.js'
// import bcrypt from 'bcryptjs'

const userModel = require('../db/userSchema')

const bcrypt = require('bcryptjs')

const Signup = async(req,res) => {
    try{

        const user = new userModel(req.body)

        await user.save()

        res.status(201).json({message : 'User Created!'})

    }catch(err){
        res.status(400).json({message : err.message})
    }
}

const Signin = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(user){

            const usertoken = await user.generateToken()

            res.cookie('jwtlogin' , usertoken , {
                expires : new Date(Date.now() + 300000),
                sameSite : 'none',
                secure : true
            })

            const checkPw = await bcrypt.compare(password,user.password)
            
            if(checkPw){
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
        
        if(password !== ''){
            password = await bcrypt.hash(password,10)
            
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{username,age,email,password},{
                new:true
            })

            res.status(201).json(updatedUser);
        }else{
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{username,age,email},{
                new:true
            })

            res.status(201).json(updatedUser);
        }         

    }catch(err){
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
    userSignedInProfile,
    Signout    
}