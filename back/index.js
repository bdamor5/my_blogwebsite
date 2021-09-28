const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()

const multer = require('multer')

const connection = require('./db/connection')
//db conneciton
connection();

const userRoute = require('./routes/userRoute')
const blogRoute = require('./routes/blogRoute')

// middlewares
app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}));

app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({limit : '50mb', extended:false}))
app.use(cookieParser())


//routes
app.use('/user',userRoute)
app.use('/blog',blogRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT = ${process.env.PORT}`)
})

