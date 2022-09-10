import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSync, faUndo } from "@fortawesome/free-solid-svg-icons";

import {
  resetPassword,
  fetchResetPasswordCode,
  formReset,
} from "../../actions/auth-actions";
import { checkPasswords, validatePassword } from "../../utils/input-validators";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [resetData, setResetData] = useState({
    password: "",
    password2: "",
    validatePasswordError: "",
    validateRepeatPasswordError: "",
  });

  const { code } = useParams();

  const history = useHistory();

  useEffect(() => {
    if (code) {
      dispatch(fetchResetPasswordCode(code));
    }
  }, [code]);

  const dispatch = useDispatch();
  const { user, errors, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(formReset());
  }, []);

  const handleInputChange = (event) => {
    setResetData({
      ...resetData,
      [event.target.name]: event.target.value,
    });
  };

  const onClickReset = (event) => {
    event.preventDefault();
    const { password, password2 } = resetData;
    const validateErrors = {};
    validateErrors.validatePasswordError = validatePassword(password);
    validateErrors.validateRepeatPasswordError = checkPasswords(
      password,
      password2
    );
    if (
      validateErrors.validatePasswordError.length !== 0 ||
      validateErrors.validateRepeatPasswordError.length !== 0
    ) {
      setResetData({
        ...resetData,
        ...validateErrors,
      });
    } else {
      setResetData({
        ...resetData,
        validatePasswordError: "",
        validateRepeatPasswordError: "",
      });
      const data = {
        email: user.email,
        password,
        password2,
      };
      dispatch(resetPassword(data, history));
    }
  };

  const { passwordError, password2Error } = errors;

  return (
    <div className="container mt-5">
      <h4>
        <FontAwesomeIcon className="mr-2" icon={faSync} /> RESET PASSWORD
      </h4>
      <hr align="left" width="550" />

      {error ? (
        <div className="alert alert-danger col-6" role="alert">
          {error}
        </div>
      ) : null}

      <form onSubmit={onClickReset}>
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
              value={resetData.password}
              className={
                passwordError || resetData.validatePasswordError
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">
              {passwordError || resetData.validatePasswordError}
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
              value={resetData.password2}
              className={
                password2Error || resetData.validateRepeatPasswordError
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">
              {password2Error || resetData.validateRepeatPasswordError}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <button type="submit" className="btn btn-dark mx-3">
            <FontAwesomeIcon className="mr-3" icon={faUndo} />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

ResetPassword.propTypes = {
  fetchResetPasswordCode: PropTypes.func.isRequired,
  formReset: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
};

export default ResetPassword;
