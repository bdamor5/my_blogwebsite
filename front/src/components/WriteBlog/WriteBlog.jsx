import React, { useState, useEffect } from "react";
import "./WriteBlog.css";
import { useHistory } from "react-router";
import axios from "axios";
import {NavLink} from 'react-router-dom'

const WriteBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });

  const [useremail, setUserEmail] = useState();
  const [username, setUserName] = useState();
  const [category, setCategory] = useState("Science");
  const [readTime, setReadTime] = useState("1 min");

  const [file, setFile] = useState("");

  const [signedOut, setsignedOut] = useState(false);

  useEffect(() => {
    setInterval(getSignedInUserProfile, 1000);
    document.documentElement.scrollTop = 0;
  }, []);

  const getSignedInUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/userSignedInProfile",
        { withCredentials: true }
      );

      setUserEmail(response.data.email);
      setUserName(response.data.username);
    } catch (err) {
      setsignedOut(true);
    }
  };

  const [written, setWritten] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!blog.title || !blog.description) {
        alert("Please Fill All The Details Correctly");
      }else if(file) {
          setWritten(true);

          const data = new FormData();

          data.append("title", blog.title);
          data.append("description", blog.description);
          data.append("readTime", readTime);
          data.append("category", category);
          data.append("useremail", useremail);
          data.append("username", username);
          data.append("image", file); //always at last

          const response = await axios.post(
            "http://localhost:8000/blog/create",
            data,
            { withCredentials: true }
          );

        }else {
          alert("Please Upload An Image");
        }
    } catch (err) {
    }
  };

  const history = useHistory();

  return (
    <div>
      {signedOut && (
        <div>
          <div class="alert alert-danger mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>User Signed Out ! Redirecting to Sign In...</p>
              <div
                class="spinner-border ms-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div style={{ opacity: 0 }}>
            {setTimeout(() => {
              setsignedOut(false);
              history.push("/user/signin");
            }, 3000)}
          </div>
        </div>
      )}
      {written  && (
        <div>
          <div class="alert alert-success mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>Blog Created ! Redirecting To Home Page...</p>
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

              setWritten(false);
              history.push("/");
              
            }, 3000)}
          </div>
        </div>
      )}
      <div className="container write">
        <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
          
          <div className="upload">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="image"
                filename="image"
                className="browse"
              />
          </div>

          <div className="category">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Category :
              </span>
              <select
                onChange={(e) => setCategory(e.target.value)}
                class="form-select"
                aria-label="Default select example"
              >
                <option name="category" value="Science">
                  Science
                </option>
                <option name="category" value="Food">
                  Food
                </option>
                <option name="category" value="Politics">
                  Politics
                </option>
                <option name="category" value="Gaming">
                  Gaming
                </option>
                <option name="category" value="Space">
                  Space
                </option>
                <option name="category" value="Religion">
                  Religion
                </option>
                <option name="category" value="Coding">
                  Coding
                </option>
              </select>
            </div>
          </div>

          <div className="read">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Reading Time :
              </span>
              <select
                onChange={(e) => setReadTime(e.target.value)}
                name="readTime"
                class="form-select"
                aria-label="Default select example"
              >
                <option name="readTime" value="1 min">
                  1 min
                </option>
                <option name="readTime" value="2 min">
                  2 min
                </option>
                <option name="readTime" value="3 min">
                  3 min
                </option>
                <option name="readTime" value="4 min">
                  4 min
                </option>
                <option name="readTime" value="5 min">
                  5 min
                </option>
                <option name="readTime" value="more than 5 min">
                  more than 5 min
                </option>
              </select>
            </div>
          </div>

          <div className="title">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Title :
              </span>
              <input
                name="title"
                value={blog.title}
                onChange={(e) => handleChange(e)}
                type="text"
                class="form-control"
                placeholder="Title for your Blog..."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <div className="blog-content">
            <div class="input-group">
              <span class="input-group-text">Blog's Content : </span>
              <textarea
                name="description"
                value={blog.description}
                onChange={(e) => handleChange(e)}
                class="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>

          <div className="blog-btn">
            <button className="btn btn-create" type="submit">
              Create
            </button>
            
            <NavLink exact to='/'>
              <button className="btn btn-edit mx-2">Go Back</button>
            </NavLink>                                                                      
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
