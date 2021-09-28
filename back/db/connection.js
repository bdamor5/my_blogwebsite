// import mongoose from 'mongoose';
const mongoose = require('mongoose')

const connection = () => {
    mongoose.connect(process.env.DB , {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex: true,
        useFindAndModify : false
    })
    .then(() => console.log('Connection To DB Made'))
    .catch(() => console.log('Connection To DB Failed'))
}

module.exports = connection