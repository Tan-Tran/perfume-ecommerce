import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import { forgotPassword, formReset } from "../../actions/auth-actions";
import { validateEmail } from "../../utils/input-validators";
import { useSelector, useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
    validateEmailError: "",
  });

  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(formReset());
  }, []);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const onClickSend = (event) => {
    event.preventDefault();

    const validateEmailError = validateEmail(data.email);
    if (validateEmailError.length !== 0) {
      setData({
        ...data,
        validateEmailError: validateEmailError,
      });
    } else {
      dispatch(forgotPassword({ email: data.email }));
    }
  };

  return (
    <div id="container" className="container mt-5">
      <h4>
        <FontAwesomeIcon className="mr-3" icon={faKey} />
        FORGOT PASSWORD?
      </h4>
      <hr align="left" width="550" />
      <p>Enter your email address that you used to create your account.</p>

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

      <form onSubmit={onClickSend}>
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
              value={data.email}
              className={
                data.validateEmailError
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">{data.validateEmailError}</div>
          </div>
        </div>

        <div className="form-group row">
          <button type="submit" className="btn btn-dark mx-3">
            <FontAwesomeIcon className="mr-3" icon={faPaperPlane} />
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  formReset: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
};

export default ForgotPassword;
