import React, { useEffect, useState } from "react";
import "./ReadBlog.css";
import { NavLink, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const ReadBlog = () => {
  const [blog, setBlog] = useState({});

  const [blogimage, setBlogImage] = useState("");

  const [email, setEmail] = useState(false);

  const [deleteBlog, setDeleteBlog] = useState(false);

  const [signedOut, setsignedOut] = useState(false);

  const params = useParams();

  useEffect(() => {
    getBlog();
    getSignedInUserProfile();
    document.documentElement.scrollTop = 0;
  }, []);

  const getBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/blog/readblog/${params.id}`
      );
      setBlog(response.data[0]);
      setBlogImage(response.data[0].image);
      console.log(response.data[0]);
    } catch (err) {}
  };

  const getSignedInUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/userSignedInProfile",
        { withCredentials: true }
      );
      setEmail(response.data.email);
    } catch (err) {
    }
  };

  const handleDelete = async () => {
    try {
        getSignedInUserProfile();
        
        if(!signedOut){
            await axios.delete(
                `http://localhost:8000/blog/delete/${params.id}?public_id=${blog.image_public_id}`,
                { withCredentials: true }
            );

            setDeleteBlog(true);
        }else{
          setsignedOut(true);
        }
    } catch (err) {
      setDeleteBlog(false);
    }
  };

  const history = useHistory();

  return (
    <div>
      {deleteBlog && (
        <div>
          <div class="alert alert-success mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>Blog Deleted ! Redirecting to Home Page...</p>
              <div
                class="spinner-border ms-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div style={{ opacity: 0 }}>
            {(document.documentElement.scrollTop = 0)}
            {setTimeout(() => {
              setDeleteBlog(false);
              history.push("/");
            }, 3000)}
          </div>
        </div>
      )}
      {signedOut && (
        <div>
          <div class="alert alert-danger mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>User Session Timed Out , No Changes Made ! Redirecting to Sign In Page...</p>
              <div
                class="spinner-border ms-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div style={{ opacity: 0 }}>
            {(document.documentElement.scrollTop = 0)}
            {setTimeout(() => {
              setsignedOut(false);
              history.push("/user/signin");
            }, 3000)}
          </div>
        </div>
      )}
      <div className="blog-btn mt-5">
        <NavLink exact to="/">
          <button className="btn btn-edit">Go To Home Page</button>
        </NavLink>
      </div>
      <div className="container write">
        <div className="display-image">
          <img src={`${blogimage}`} alt="" className="read-image" />
        </div>

        <div className="category-read">
          <h5>Category : {blog.category}</h5>
          <h5>{blog.readTime} To Read</h5>
        </div>

        <div className="title-read">
          <h4>Title : {blog.title}.</h4>
        </div>

        <div className="blogread-content">
          <h6>{blog.description}</h6>
        </div>

        {email === blog.useremail && (
          <div className="blog-btn d-flex">
            <NavLink exact to={`/blog/editblog/${params.id}`}>
              <button className="btn btn-edit">Edit Blog</button>
            </NavLink>

            <button
              type="button"
              class="btn btn-delete"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Delete Blog
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body d-flex justify-content-center">
                    Are You Sure About Deleting This Blog?
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-delete"
                      onClick={handleDelete}
                      data-bs-dismiss="modal"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      class="btn btn-edit"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadBlog;
