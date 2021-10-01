import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import WriteBlog from "./components/WriteBlog/WriteBlog";
import ReadBlog from './components/ReadBlog/ReadBlog'
import EditBlog from './components/EditBlog/EditBlog'
import SeeUserProfile from "./components/SeeUserProfile/SeeUserProfile";
import EditUserProfile from './components/EditUserProfile/EditUserProfile'
import EditUserPassword from "./components/EditUserPassword/EditUserPassword";

const App = () => {
  return (
      <div className="pagewrap">
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/signin" component={Signin} />
            <Route exact path="/user/signup" component={Signup} />
            <Route exact path="/user/profile" component={SeeUserProfile} />
            <Route exact path="/user/edit-profile/:id" component={EditUserProfile} />
            <Route exact path="/user/edit-password/:id" component={EditUserPassword} />
            <Route exact path="/blog/writeblog" component={WriteBlog} />
            <Route exact path='/blog/readblog/:id' component={ReadBlog} />
            <Route exact path='/blog/editblog/:id' component={EditBlog} />
            <Redirect to='/'/>
          </Switch>
        </div>
        <Footer />
      </div>
  );
};

export default App;
