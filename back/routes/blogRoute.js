import express from "express";
const router = express.Router()

import { allBlogs, createBlog, deleteBlog, updateBlog, userBlogs,readBlog} from "../controllers/blogControllers.js";
import {auth} from '../middlewares/auth.js'
import storage from '../utils/fileUpload.js'

router.post('/create',auth,storage.single('image'),createBlog)

router.get('/all',allBlogs)

router.post('/user-blogs',auth,userBlogs)

router.get('/readblog/:id',readBlog)

router.put('/update/:id',auth,storage.single('image'),updateBlog)

router.delete('/delete/:id',auth,deleteBlog)

export default router
