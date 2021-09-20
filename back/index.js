import express from 'express'
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()

import multer from 'multer'

import connection from './db/connection.js'
//db conneciton
connection();

import userRoute from './routes/userRoute.js'
import blogRoute from './routes/blogRoute.js'

// middlewares
app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


//routes
app.use('/user',userRoute)
app.use('/blog',blogRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT = ${process.env.PORT}`)
})

