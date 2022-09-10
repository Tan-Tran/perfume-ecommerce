import React, { useState } from "react";

import { faEdit, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AccountNavbar from "../../components/AccountNavbar/AccountNavbar";
import { updateUserInfo } from "../../actions/user-actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const UserEditProfile = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [password, setPassword] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: localStorage.getItem("email"),
      password: password,
    };

    dispatch(updateUserInfo(data, history));
  };

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <AccountNavbar />
      <div className="container mt-5">
        <h4>
          <FontAwesomeIcon className="mr-2" icon={faLock} /> Change Password
        </h4>
        <form onSubmit={onFormSubmit}>
          <div className="form-group row mt-5">
            <label className="col-form-label mx-3">
              Enter a new password:{" "}
            </label>
            <div className="col-sm-4">
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-dark">
            <FontAwesomeIcon className="mr-2" icon={faEdit} /> Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEditProfile;
