import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim:true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    useremail : {
        type : String,
        trim : true,
        required : true,
    },
    username : {
        type : String,
        trim : true,
        required : true,
    },
    category : {
        type : String,
        required : true
    },
    readTime : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const blogModel = mongoose.model('Blog',blogSchema)

export default blogModel