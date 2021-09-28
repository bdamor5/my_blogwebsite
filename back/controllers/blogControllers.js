// import blogModel from "../db/blogSchema.js";

// import cloudinary from '../utils/cloudinary.js';

const blogModel = require('../db/blogSchema')

const {cloudinary} = require('../utils/cloudinary')

const createBlog = async (req, res) => {
  try {
    var image = req.body.image;
    // console.log(image);
    // console.log(req.body)

    const response = await cloudinary.uploader.upload(image, {
      upload_preset: "my_blogwebsite",
    });

    // console.log(response);

    const blog = new blogModel({
      ...req.body,
      image : response.secure_url,
      image_public_id : response.public_id
    });

    await blog.save();

      // console.log(blog)

    res.status(201).json(blog._id);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
};

const allBlogs = async (req, res) => {
  try {
    var cat = req.query.categories;

    if (cat) {
      cat = cat.split(",");
      const all = await blogModel.find({ category: { $in: cat } });

      res.status(200).json(all);
    } else {
      //when all categories are selected , cat will be undefined
      const all = await blogModel.find({});

      res.status(200).json(all);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const userBlogs = async (req, res) => {
  try {
    const userBlogs = await blogModel.find({ useremail: req.body.email });

    res.status(200).json(userBlogs);
  } catch (err) {
    res.status(400).json(err);
  }
};

const readBlog = async (req, res) => {
  try {
    const readBlog = await blogModel.find({ _id: req.params.id });

    res.status(200).json(readBlog);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateBlog = async (req, res) => {
  try {
    var update;
    var image = req.body.image;

    if (image) {

      var public_id = req.query.public_id
      // console.log(public_id)

      const response = await cloudinary.uploader.upload(image, {
        upload_preset: "my_blogwebsite",
        public_id : public_id
      });

      update = await blogModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: response.url },
        {
          new: true,
        }
      );

    } else {
      update = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    }

    res.status(200).json(update);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    var public_id = req.query.public_id
    // console.log(public_id)
  
    await cloudinary.uploader.destroy(public_id)

    const deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteBlog);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createBlog,
  allBlogs,
  userBlogs,
  readBlog,
  updateBlog,
  deleteBlog
}
