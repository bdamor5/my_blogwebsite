import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";


const EditUserPassword = () => {
  const [pw, setPw] = useState("");
  const [Rpw, setRPw] = useState("");

  const [signedOut, setsignedOut] = useState(false);
  const [edit, setEdit] = useState();

  const [pwCheck, setPwCheck] = useState("");

  const [notValidPw, setNotValidPw] = useState(false);

  useEffect(() => {
    checkUserSession();
  }, []);

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

  const params = useParams();

  const editPw = async(e) => {
    e.preventDefault();

    checkUserSession();

    if (!signedOut) {
      if (!pw || !Rpw) {
        alert("Please Fill Both The Fields Correctly");
      } 

      var cnt = 0;

      if (pw.length < 5) {
        setNotValidPw(true);
      }else{
          setNotValidPw(false)
          cnt = 1
      }

      if (cnt === 1 && pw === Rpw) {
        cnt = 0;
        console.log("editpw");
         
        const response = await axios.put(
          `http://localhost:8000/user/profile/update-password/${params.id}`,
          {pw},
          { withCredentials: true }
        );

        // console.log(response.status)

       if(response.status === 203){
         setPwCheck(true)
         setEdit(false)
       }else{
         setEdit(true)
       }

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
              <p>Password Updated ! Redirecting To Your Profile Page...</p>
              <div
                class="spinner-border ms-3"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div style={{ opacity: 0 }}>
            {setTimeout(() => {
              setEdit(false)
              history.push("/user/profile");
            }, 3000)}
          </div>
        </div>
      ) : <div></div>
      }

      {
        pwCheck 
        &&
          <div class="alert alert-danger mx-auto" role="alert">
              <div class="d-flex justify-content-center align-items-center">
                <p>
                  New Password Matches With Your Old Password , Please Try A New One...
                </p>
              </div>
          </div>
      }

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
            <h3>Reset Password</h3>
          </div>
          <div className="signup">
            <form>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password :
                </label>
                <input
                  name="password"
                  value={pw}
                  onChange={(e) => {setPw(e.target.value); setNotValidPw(); setPwCheck(); }}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password..."
                />
                {notValidPw && (
                  <p style={{ color: "red" }}>Minimum 5 characters required</p>
                )}
              </div>

              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Re-enter Password :
                </label>
                <input
                  name="password"
                  value={Rpw}
                  onChange={(e) => {setRPw(e.target.value); setNotValidPw(); setPwCheck(); }}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password..."
                />
                {
                  pw !== Rpw && pw && Rpw
                  ? <p style={{ color: "red" }}>Passwords Arent Matching , Please Try Again</p>
                  :<div></div>
                }
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
                  onClick={(e) => editPw(e)}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserPassword;
