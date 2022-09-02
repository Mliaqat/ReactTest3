import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { uitoggleaction } from "../../Store/UiSlice";

function Login() {
  let userData = useSelector((state) => state.data.data);
  const [matchedData, setMatchedData] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    
  } = useInput((value) => value.includes("@"));
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
   
  } = useInput((value) => value.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUser = userData.find(
      (obj) => obj.email === email && obj.password === password
    );
    if (checkUser) {
     localStorage.setItem("userdata",checkUser.email)
     localStorage.setItem("userrole",checkUser.role)
      dispatch(uitoggleaction.userRole(checkUser.role));
        navigate("/home");
    } else {
      setMatchedData(true);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header mt-3">
            <h3>Login</h3>
            {matchedData && (
              <p className="error-text">User Not Found</p>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div
                className={emailHasError ? "invalid form-group" : "form-group"}
              >
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
                {emailHasError && (
                  <p className="error-text"> Please enter your email</p>
                )}
              </div>
              <div
                className={
                  passwordHasError
                    ? "invalid form-group my-3"
                    : "form-group my-3"
                }
              >
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
                {passwordHasError && (
                  <p className="error-text">Please enter your password </p>
                )}
              </div>

              <div className="form-group">
                <button type="submit" className="btn float-right login_btn">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<Link to="signup">Sign Up</Link>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
