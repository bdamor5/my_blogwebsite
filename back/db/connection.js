import mongoose from 'mongoose';

const connection = () => {
    mongoose.connect(process.env.DB , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => console.log('Connection To DB Made'))
    .catch(() => console.log('Connection To DB Failed'))
}

export default connection