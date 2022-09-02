import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../Store/dataSlice";
import { uitoggleaction } from "../../Store/UiSlice";

function SignUp() {
  const dispatch = useDispatch();
  let userData = useSelector((state) => state.data.data);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.find((obj) => obj.role === "ADMIN")) {
      setIsAdmin(false);
    }
  }, [userData]);

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
   
  } = useInput((value) => value.trim() !== "");
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    
  } = useInput((value) => value.trim() !== "");
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
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    
  } = useInput((value) => value.trim() !== "");

  let matchingPass = false;
  if (password === confirmPassword) {
    matchingPass = true;
  }

  let formIsValid = false;
  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    matchingPass
  ) {
    formIsValid = true;
  }

  const data = {
    firstName,
    lastName,
    email,
    password,
    role,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.find((obj) => obj.email === email)) {
      setAlreadyExist(false);
      await axios
        .post(
          "https://reacttest2-8df5e-default-rtdb.firebaseio.com/user.json",
          data
        )
        .then((res) => {
          dispatch(uitoggleaction.submitData());
          navigate("/");
        })
        .catch((error) => {
          setError(true)
        });
    } else {
      setAlreadyExist(true);
    }
  };

  let matchPassword=confirmPasswordHasError && !matchingPass 

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header mt-3">
            <h3>Register Now</h3>
            {alreadyExist && <p className="error-text"> user already exists</p>}
            {error && (
              <p className="error-text">Network Down</p>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div
                className={
                  firstNameHasError ? "invalid form-group" : "form-group"
                }
              >
                <label>First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                />
                {firstNameHasError && (
                  <p className="error-text"> Please enter your first name </p>
                )}
              </div>
              <div
                className={
                  lastNameHasError
                    ? "invalid form-group my-3"
                    : "form-group my-3"
                }
              >
                <label>Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={lastNameChangeHandler}
                  onBlur={lastNameBlurHandler}
                />
                {lastNameHasError && (
                  <p className="error-text">Please enter your last name </p>
                )}
              </div>
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
                    ? "invalid form-group mt-3"
                    : "form-group mt-3"
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
              <div
                className={
                  confirmPasswordHasError
                    ? "invalid form-group my-3"
                    : "form-group my-3"
                }
              >
                <label>Confrim Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your confrim password"
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                  onBlur={confirmPasswordBlurHandler}
                />
                {confirmPasswordHasError && (
                  <p className="error-text">
                    Please enter your confirm password
                  </p>
                )}
                 {matchPassword && (
                  <p className="error-text">
                   Password Not Matched
                  </p>
                )}
              </div>
              {isAdmin && (
                <div className="form-group my-3">
                  <label>Select Admin:</label>
                  <div className="grid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => setRole(e.target.value)}
                      value="ADMIN"
                      id="defaultCheck1"
                    />
                    <label className="ms-3">Is Admin</label>
                  </div>
                  <br></br>
                </div>
              )}

              <div className="form-group">
                <button
                  type="submit"
                  disabled={!formIsValid}
                  className="btn float-right login_btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              <Link to="/">Login Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
