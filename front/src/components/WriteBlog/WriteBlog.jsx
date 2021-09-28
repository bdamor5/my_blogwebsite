import React, { useState, useEffect } from "react";
import "./WriteBlog.css";
import { useHistory } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";

const WriteBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });

  const [useremail, setUserEmail] = useState('');
  const [username, setUserName] = useState('');
  const [category, setCategory] = useState("Science");
  const [readTime, setReadTime] = useState("1 min");

  const [file, setFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [signedOut, setsignedOut] = useState(false);

  const [blogid , setBlogid] = useState('')

  useEffect(() => {
    getSignedInUserProfile()
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

  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);

    previewFile(imageFile);
  };

  const previewFile = (imageFile) => {
    const reader = new FileReader(); //FileReader is used to read the contents of a Blob or File.
    reader.readAsDataURL(imageFile); //The result is a string with a data: URL representing the file's data.
    reader.onloadend = () => {
      //The FileReader.onloadend property contains an event handler executed when the content read with readAsArrayBuffer, readAsBinaryString, readAsDataURL or readAsText is available , i.e This event is triggered each time the reading operation is completed (either in success or failure).
      // console.log(reader.result); //The FileReader result attribute contains the data as a dataURL representing the file's data as a base64 encoded string.
      setPreviewImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!blog.title || !blog.description) {
        alert("Please Fill All The Details Correctly");
      } else if (file) {
        const res = await axios.get(
          "http://localhost:8000/user/userSignedInProfile",
          { withCredentials: true }
        );
  
        setUserEmail(res.data.email);
        setUserName(res.data.username);

        const response = await axios.post(
          "http://localhost:8000/blog/create",
          {
            title : blog.title,
            description : blog.description,
            readTime,
            category,
            useremail,
            username,
            image : previewImage,
          },
          { withCredentials: true }
        );

          setBlogid(response.data)
          // console.log(response.data)

          document.documentElement.scrollTop = 0;
          setWritten(true);

      } else {
        alert("Please Upload An Image");
      }
    } catch (err) {}
  };

  const history = useHistory();

  return (
    <div>
      {signedOut && (
        <div>
          <div class="alert alert-danger mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>User Session Timed Out ! Redirecting to Sign In...</p>
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
      {written && (
        <div>
          <div class="alert alert-success mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>Blog Created ! Redirecting To The Created Blog Page...</p>
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
              history.push(`/blog/readblog/${blogid}`); 
            }, 3000)}
          </div>
        </div>
      )}
      <div className="container write">
        <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
          <div className="upload">
            <input
              onChange={(e) => handleImage(e)}
              type="file"
              id="image"
              filename="image"
              className="browse"
            />
          </div>

          {previewImage && (
            <div className="container d-flex justify-content-center my-3">
              <img
                src={previewImage}
                alt="uploaded"
                className="img-fluid"
                style={{ height: "200px" }}
              />
            </div>
          )}

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

            <NavLink exact to="/">
              <button className="btn btn-edit mx-2">Go To Home Page</button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
