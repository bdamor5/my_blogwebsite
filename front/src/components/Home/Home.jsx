import React, { useState, useEffect } from "react";
import Section from "../Section/Section";
import Content from "../Content/Content";
import Blogs from "../Blogs/Blogs";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async (query) => {
    try {
      // console.log('home',query)

      if (query) {
        const response = await axios.get(
          `http://localhost:8000/blog/all?categories=${query}`
        );
        console.log(response.data);
        setBlogs(response.data);
      } else {
        const response = await axios.get("http://localhost:8000/blog/all");
        console.log(response.data);
        setBlogs(response.data);
      }
      setShow(true);
    } catch (err) {
      setShow(false);
    }
  };

  const catFilter = (query) => {
    // console.log('home',query)
    getAllBlogs(query);
    setShow(false); //will show blogs loading whenever we filter
  };

  return (
    <div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-4 accord">
            <Section catFilter={catFilter} />
          </div>

          <div className="col-8 contents">
            <Content />
            <br />
            {show ? (
              <Blogs filteredBlogs={blogs} />
            ) : (
              <div class="d-flex justify-content-center align-items-center">
                <p>Blogs Loading...</p>
                <div
                  class="spinner-border ms-3"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
