import React from "react";
import "./Signup.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import validator from "validator";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
  });

  const [notValidEmail, setNotValidEmail] = useState(false);
  const [notValidPw, setNotValidPw] = useState(false);
  const [notValidAge, setNotValidAge] = useState(false);
  const [notValidName, setNotValidName] = useState(false);

  const response = useSelector((state) => state.userReducerSignup);
  const dispatch = useDispatch();

  const updateUser = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });

    setNotValidEmail(false)
    setNotValidName(false)
    setNotValidPw(false)
    setNotValidAge(false)
  };

  const signupUser = (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password) {
      alert("Please Fill All The Details Correctly");
      
    }

    var cnt = 0;

    if (!validator.isEmail(user.email)) {
      setNotValidEmail(true);
      
    //   console.log('invalid email')
    }else{
        setNotValidEmail(false)
        cnt = cnt + 1
    }

    if (!user.age || user.age > 80 || user.age < 14) {
      setNotValidAge(true);
      
    //   console.log('invalid age')
    }else{
        setNotValidAge(false)
        cnt = cnt + 1
    }

    if (user.password.length < 5) {
      setNotValidPw(true);
      
    //   console.log('invalid pw')
    }else{
        setNotValidPw(false)
        cnt = cnt + 1
    }

    if (user.username.length < 3 || validator.isNumeric(user.username)) {
      setNotValidName(true);
      
    //   console.log('invalid username')
    }else{
        setNotValidName(false)
        cnt = cnt + 1
    }
    
    // console.log(cnt)

    if(cnt === 4){
        console.log('signup')
        dispatch(userSignup(user))
    }

  };
  const history = useHistory();

  return (
    <div>
      {/* {console.log('signup' , response.state)}  */}
      {response.state === 201 ? (
        <div>
          <div class="alert alert-success mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>User Created ! Redirecting to Signin Page...</p>
              <div
                class="spinner-border ms-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div style={{ opacity: 0 }}>
            {setTimeout(() => {
              history.push("/user/signin");
            }, 3000)}
          </div>
        </div>
      ) : response.state === 205 ? (
        <div class="alert alert-danger" role="alert">
          <div className="d-flex justify-content-center align-items-center">
            User Already exist &nbsp;
            <NavLink exact to="/user/signin">
              {" "}
              click here to Signin
            </NavLink>
          </div>
        </div>
      ) : response.state === 400 ? (
        <div class="alert alert-danger" role="alert">
          <div className="d-flex justify-content-center align-items-center">
            An Error Occured , Please Try Again
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {(response.state = "")}
      <div className="signup">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name :{" "}
            </label>
            <input
              name="username"
              value={user.username}
              onChange={updateUser}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="off"
              placeholder="Enter Your Name ..."
            />
            {notValidName && (
              <p style={{ color: "red" }}>Minimum 3 alphabetic characters required</p>
            )}
          </div>

          <div className="mb-3">
            <label for="exampleInputAge" className="form-label">
              Age :{" "}
            </label>
            <input
              name="age"
              value={user.age}
              onChange={updateUser}
              max="80"
              type="number"
              className="form-control"
              id="exampleInputAge"
              aria-describedby="emailHelp"
              autoComplete="off"
              placeholder="Enter Your Age ..."
            />
            {notValidAge && <p style={{ color: "red" }}>Invalid Age</p>}
          </div>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address :{" "}
            </label>
            <input
              name="email"
              value={user.email}
              onChange={(e) => updateUser(e)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="off"
              placeholder="Enter Your Email Address ..."
            />
            {notValidEmail && (
              <p style={{ color: "red" }}>Invalid Email Address</p>
            )}
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password :{" "}
            </label>
            <input
              name="password"
              value={user.password}
              onChange={updateUser}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password..."
            />
            {notValidPw && (
              <p style={{ color: "red" }}>Minimum 5 characters required</p>
            )}
          </div>

          <div className="signup-btn">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => signupUser(e)}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
