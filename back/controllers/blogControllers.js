import blogModel from "../db/blogSchema.js";

export const createBlog = async (req, res) => {
  try {
    const blog = new blogModel({
      ...req.body,
      image: req.file.filename,
    });

    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const allBlogs = async (req, res) => {
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

export const userBlogs = async (req, res) => {
  try {
    const userBlogs = await blogModel.find({ useremail: req.body.email });

    res.status(200).json(userBlogs);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const readBlog = async (req, res) => {
  try {
    const readBlog = await blogModel.find({ _id: req.params.id });

    res.status(200).json(readBlog);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateBlog = async (req, res) => {
  try {

    var update
    if (req.file) {
      update = await blogModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: req.file.filename },
        {
          new: true,
        }
      );
    } else {
      update = await blogModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
    }

    res.status(200).json(update);
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteBlog);
  } catch (err) {
    res.status(400).json(err);
  }
};
