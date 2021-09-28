// import express from "express";
const express = require('express')
const router = express.Router()

const blogCon = require("../controllers/blogControllers");
const auth = require('../middlewares/auth')

router.post('/create',auth,blogCon.createBlog)

router.get('/all',blogCon.allBlogs)

router.post('/user-blogs',auth,blogCon.userBlogs)

router.get('/readblog/:id',blogCon.readBlog)

router.put('/update/:id',auth,blogCon.updateBlog)

router.delete('/delete/:id',auth,blogCon.deleteBlog)

module.exports = router
