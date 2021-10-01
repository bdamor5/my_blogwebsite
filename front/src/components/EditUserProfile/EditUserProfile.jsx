import React from "react";
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink, useParams } from "react-router-dom";
import { userEditProfile } from "../../redux/actions/userActions";
import axios from "axios";
import validator from "validator";

const EditUserProfile = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const [signedOut, setsignedOut] = useState(false);
  const [edit, setEdit] = useState();

  const [usernameCheck, setUsernameCheck] = useState("");
  const [ageCheck, setAgeCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState("");

  const [notValidEmail, setNotValidEmail] = useState(false);
  const [notValidAge, setNotValidAge] = useState(false);
  const [notValidName, setNotValidName] = useState(false);

  useEffect(() => {
    getSignedInUserProfile();
    checkUserSession();
  }, []);

  const getSignedInUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/userSignedInProfile",
        { withCredentials: true }
      );
      //  console.log('1',response)

      setUsername(response.data.username);
      setAge(response.data.age);
      setEmail(response.data.email);

      setUsernameCheck(response.data.username);
      setAgeCheck(response.data.age);
      setEmailCheck(response.data.email);
    } catch (err) {}
  };

  const checkUserSession = async () => {
    try {
      await axios.get(
        "http://localhost:8000/user/userSignedInProfile",
        { withCredentials: true }
      );
    } catch (err) {
      setsignedOut(true);
    }
  };

  const dispatch = useDispatch();
  const params = useParams();

  const editUser = (e) => {
    e.preventDefault();

    checkUserSession();

    if (!signedOut) {
      if (!username || !email || !age) {
        alert("Please Fill All The Details Correctly");
        
      } else {
        if (
          username === usernameCheck &&
          email === emailCheck &&
          age === ageCheck ) {
          setEdit(false);
        }
      }

      var cnt = 0;

      if (!validator.isEmail(email)) {
        setNotValidEmail(true);
        
        console.log('invalid email')
      } else {
        setNotValidEmail(false);
        cnt = cnt + 1;
      }

      if (!age || age > 80 || age < 14) {
        setNotValidAge(true);
        
        console.log('invalid age')
      } else {
        setNotValidAge(false);
        cnt = cnt + 1;
      }

      if (username.length < 3 || validator.isNumeric(username)) {
        setNotValidName(true);
        
        console.log('invalid username')
      } else {
        setNotValidName(false);
        cnt = cnt + 1;
      }

      // console.log(cnt)

      if (cnt === 3) {
        console.log("edituser");
        dispatch(
          userEditProfile(params.id, { username, email, age})
        );
        setEdit(true);
      }
    }
  };
  const history = useHistory();

  return (
    <div>
      {edit && signedOut === false ? (
        <div>
          <div class="alert alert-success mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>Profile Edited ! Redirecting To Your Profile Page...</p>
              <div
                class="spinner-border ms-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div style={{ opacity: 0 }}>
            {setTimeout(() => {
              history.push("/user/profile");
            }, 3000)}
          </div>
        </div>
      ) : edit === false && signedOut === false ? (
        <div>
          <div class="alert alert-danger mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>
                No Changes Made...
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {signedOut ? (
        <div>
          <div class="alert alert-danger mx-auto" role="alert">
            <div class="d-flex justify-content-center align-items-center">
              <p>
                User Session Timed Out , No Changes Made ! Redirecting to Sign
                In Page...
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
              setsignedOut(false);
              history.push("/user/signin");
            }, 3000)}
          </div>
        </div>
      ) : (
        <div>
          <div className="profile">
            <h3>{`${username}'s Profile`}</h3>
          </div>
          <div className="signup">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Edit Name :{" "}
                </label>
                <input
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setNotValidName(false);
                    setEdit();
                  }}
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
                  Edit Age :{" "}
                </label>
                <input
                  name="age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setNotValidAge(false);
                    setEdit();
                  }}
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
                  Edit Email address :{" "}
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setNotValidEmail(false);
                    setEdit();
                  }}
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

              <div className="blog-btn">
                <NavLink exact to="/user/profile">
                  <button type="submit" className="btn btn-edit">
                    Go Back
                  </button>
                </NavLink>
                <button
                  type="submit"
                  className="btn btn-primary mx-3"
                  onClick={(e) => editUser(e)}
                >
                  Save Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserProfile;
