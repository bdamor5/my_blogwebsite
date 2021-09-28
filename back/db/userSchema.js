// import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    age : {
        type : Number,
        trim : true,
        required : true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{
    timestamps : true
})

userSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.generateToken = async function(){
    try{
            const token = jwt.sign({_id:this._id.toString()} , process.env.secret)

            this.tokens = this.tokens.concat({token})

            await this.save()

            return token
    }catch(err){
        console.log(err)
    }
}

const userModel = mongoose.model('User',userSchema);

// export default userModel;

module.exports = userModel