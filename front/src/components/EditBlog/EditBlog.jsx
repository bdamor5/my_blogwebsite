import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";

const EditBlog = () => {
  const [blog, setBlog] = useState({});

  const [category, setCategory] = useState();

  const [read, setRead] = useState();

  const [edited, setEdited] = useState();

  const [file, setFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [signedOut, setsignedOut] = useState(false);

  const params = useParams();

  useEffect(() => {
    getBlog();
    document.documentElement.scrollTop = 0;
    getSignedInUserProfile();
  }, []);

  const getBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/blog/readblog/${params.id}`
      );
      setBlog(response.data[0]);
      setCategory(response.data[0].category);
      setRead(response.data[0].readTime);
    } catch (err) {}
  };

  const getSignedInUserProfile = async () => {
    try {
      await axios.get(
        "http://localhost:8000/user/userSignedInProfile",
        { withCredentials: true }
      );
    } catch (err) {
      setsignedOut(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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
      console.log(reader.result); //The FileReader result attribute contains the data as a dataURL representing the file's data as a base64 encoded string.
      setPreviewImage(reader.result);
    };
  };

  const handleEdit = async (e) => {
    try {
      getSignedInUserProfile();

      if (!signedOut) {
        e.preventDefault();

        if (!blog.title || !blog.description) {
          alert("Please Fill All The Details Correctly");
        } else {
          if (file) {
            await axios.put(
              `http://localhost:8000/blog/update/${params.id}?public_id=${blog.image_public_id}`,
              {
                title: blog.title,
                description: blog.description,
                readTime: read,
                category,
                image: previewImage,
              },
              { withCredentials: true }
            );
          } else {
            await axios.put(
              `http://localhost:8000/blog/update/${params.id}`,
              {
                title: blog.title,
                description: blog.description,
                readTime: read,
                category,
              },
              { withCredentials: true }
            );
          }
          setEdited(true);
        }
      }
    } catch (err) {}
  };

  const history = useHistory();

  return (
    <div>
      {edited && (
        <div>
          <div class="alert alert-success mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>
                Saving If Any Changes Are Made ! Redirecting To Your Blog
                Page...
              </p>
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
              setEdited(false);
              history.push(`/blog/readblog/${params.id}`);
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
      <div className="container write">
        <form encType="multipart/form-data" onSubmit={(e) => handleEdit(e)}>
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
            <select
              onChange={(e) => setCategory(e.target.value)}
              class="form-select"
              aria-label="Default select example"
            >
              <option
                selected={category === "Science" ? "true" : "false"}
                name="category"
                value="Science"
              >
                Science
              </option>
              <option
                selected={category === "Food" ? "true" : "false"}
                name="category"
                value="Food"
              >
                Food
              </option>
              <option
                selected={category === "Politics" ? "true" : "false"}
                name="category"
                value="Politics"
              >
                Politics
              </option>
              <option
                selected={category === "Gaming" ? "true" : "false"}
                name="category"
                value="Gaming"
              >
                Gaming
              </option>
              <option
                selected={category === "Space" ? "true" : "false"}
                name="category"
                value="Space"
              >
                Space
              </option>
              <option
                selected={category === "Religion" ? "true" : "false"}
                name="category"
                value="Religion"
              >
                Religion
              </option>
              <option
                selected={category === "Coding" ? "true" : "false"}
                name="category"
                value="Coding"
              >
                Coding
              </option>
            </select>
          </div>

          <div className="read">
            <select
              onChange={(e) => setRead(e.target.value)}
              class="form-select"
              aria-label="Default select example"
            >
              <option
                selected={read === "1 min" ? "true" : "false"}
                name="readTime"
                value="1 min"
              >
                {" "}
                1 min
              </option>
              <option
                selected={read === "2 min" ? "true" : "false"}
                name="readTime"
                value="2 min"
              >
                2 min
              </option>
              <option
                selected={read === "3 min" ? "true" : "false"}
                name="readTime"
                value="3 min"
              >
                3 min
              </option>
              <option
                selected={read === "4 min" ? "true" : "false"}
                name="readTime"
                value="4 min"
              >
                4 min
              </option>
              <option
                selected={read === "5 min" ? "true" : "false"}
                name="readTime"
                value="5 min"
              >
                5 min
              </option>
              <option
                selected={read === "more than 5 min" ? "true" : "false"}
                name="readTime"
                value="more than 5 min"
              >
                more than 5 min
              </option>
            </select>
          </div>

          <div className="title">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Title :{" "}
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
              Save Edit
            </button>
            <NavLink exact to={`/blog/readblog/${blog._id}`}>
              <button className="btn btn-edit mx-2">Go Back</button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
