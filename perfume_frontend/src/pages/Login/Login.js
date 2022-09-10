import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect, useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import { login, formReset, activateAccount } from "../../actions/auth-actions";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.auth);
  const { code } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(formReset());
  }, []);

  useEffect(() => {
    if (code) {
      dispatch(activateAccount(code));
    }
  }, [code]);

  const [loginData, setLoginData] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
  });

  if (localStorage.getItem("isLoggedIn")) {
    return Redirect("/account");
  }

  const onClickSignIn = (event) => {
    event.preventDefault();
    dispatch(login(loginData, history));
  };

  const handleInputChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div id="container" className="container mt-5">
      <h4>
        <FontAwesomeIcon className="mr-3" icon={faSignInAlt} />
        SIGN IN
      </h4>
      <hr align="left" width="550" />
      {error ? (
        <div className="alert alert-danger col-6" role="alert">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="alert alert-success col-6" role="alert">
          {success}
        </div>
      ) : null}
      <div className="col">
        <form onSubmit={onClickSignIn}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">E-mail: </label>
            <FontAwesomeIcon
              style={{ position: "relative", top: "8px" }}
              icon={faEnvelope}
            />
            <div className="col-sm-4">
              <input
                className="form-control"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password: </label>
            <FontAwesomeIcon
              style={{ position: "relative", top: "8px" }}
              icon={faLock}
            />
            <div className="col-sm-4">
              <input
                className="form-control"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <button type="submit" className="btn btn-dark mx-3">
              <FontAwesomeIcon className="mr-3" icon={faSignInAlt} />
              Sign in
            </button>
            <Link to={"/forgot"} style={{ position: "relative", top: "8px" }}>
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  formReset: PropTypes.func.isRequired,
  activateAccount: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
};

export default Login;
