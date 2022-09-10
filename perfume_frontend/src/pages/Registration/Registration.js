import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { registration, formReset } from "../../actions/auth-actions";

import {
  checkPasswords,
  validateEmail,
  validatePassword,
} from "../../utils/input-validators";
import { useDispatch, useSelector } from "react-redux";

const Registration = () => {
  const initialState = {
    email: "",
    username: "",
    password: "",
    password2: "",
    captchaValue: "",
    validateEmailError: "",
    validatePasswordError: "",
    validateRepeatPasswordError: "",
  };

  useEffect(() => {
    dispatch(formReset());
  }, []);

  const dispatch = useDispatch();
  const [registrationData, setRegistrationData] = useState(initialState);
  const { errors, isRegistered, isLoading } = useSelector(
    (state) => state.auth
  );

  const {
    validateEmailError,
    validatePasswordError,
    validateRepeatPasswordError,
  } = registrationData;

  const { emailError, usernameError, passwordError, password2Error } = errors;

  const handleInputChange = (event) => {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeRecaptcha = (value) => {
    setRegistrationData({
      ...registrationData,
      captchaValue: value,
    });
  };

  const onClickSignUp = (event) => {
    event.preventDefault();
    const { email, username, password, password2, captchaValue } =
      registrationData;
    const validateErrors = {};
    validateErrors.validateEmailError = validateEmail(email);
    validateErrors.validatePasswordError = validatePassword(password);
    validateErrors.validateRepeatPasswordError = checkPasswords(
      password,
      password2
    );

    if (
      validateErrors.validateEmailError.length !== 0 ||
      validateErrors.validatePasswordError.length !== 0 ||
      validateErrors.validateRepeatPasswordError.length !== 0
    ) {
      setRegistrationData({
        ...registrationData,
        ...validateErrors,
      });
    } else {
      const bodyFormData = new FormData();

      bodyFormData.append("email", email);
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);
      bodyFormData.append("password2", password2);
      bodyFormData.append("g-recaptcha-response", captchaValue);

      setRegistrationData({
        ...registrationData,
        validateEmailError: "",
        validatePasswordError: "",
        validateRepeatPasswordError: "",
      });

      dispatch(registration(bodyFormData)).then(() => {
        if (isRegistered) {
          setRegistrationData({
            ...initialState,
          });
        }
      });
      window.grecaptcha.reset();
    }
  };

  return (
    <div className="container mt-5">
      <h4>
        <FontAwesomeIcon className="mr-2" icon={faUserPlus} /> SIGN UP
      </h4>
      <hr align="left" width="550" />

      {isRegistered ? (
        <div className="alert alert-success col-6" role="alert">
          Activation code has been sent to your email!
        </div>
      ) : null}

      {isLoading ? (
        <div className="alert alert-warning col-6" role="alert">
          Sending activate code ...!
        </div>
      ) : null}

      <form onSubmit={onClickSignUp}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">E-mail: </label>
          <FontAwesomeIcon
            style={{ position: "relative", top: "8px" }}
            icon={faEnvelope}
          />
          <div className="col-sm-4">
            <input
              type="text"
              name="email"
              value={registrationData.email}
              className={
                emailError || validateEmailError
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">
              {emailError || validateEmailError}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">User name: </label>
          <FontAwesomeIcon
            style={{ position: "relative", top: "8px" }}
            icon={faUser}
          />
          <div className="col-sm-4">
            <input
              type="text"
              name="username"
              value={registrationData.username}
              className={
                usernameError ? "form-control is-invalid" : "form-control"
              }
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{usernameError}</div>
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
              type="password"
              name="password"
              value={registrationData.password}
              className={
                passwordError || validatePasswordError
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">
              {passwordError || validatePasswordError}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Confirm password: </label>
          <FontAwesomeIcon
            style={{ position: "relative", top: "8px" }}
            icon={faLock}
          />
          <div className="col-sm-4">
            <input
              type="password"
              name="password2"
              value={registrationData.password2}
              className={
                password2Error || validateRepeatPasswordError
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">
              {password2Error || validateRepeatPasswordError}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <button type="submit" className="btn btn-dark mx-3">
            <FontAwesomeIcon className="mr-2" icon={faUserPlus} />
            Sign up
          </button>
        </div>

        <ReCAPTCHA
          onChange={onChangeRecaptcha}
          sitekey="6Leqvj8hAAAAAN2jxfCo_ZOZmv6BBhfbTIsd15bA"
        />
      </form>
    </div>
  );
};

Registration.propTypes = {
  registration: PropTypes.func.isRequired,
  formReset: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isRegistered: PropTypes.bool.isRequired,
};

export default Registration;
