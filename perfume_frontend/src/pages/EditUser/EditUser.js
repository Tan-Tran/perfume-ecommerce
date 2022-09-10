import React, { useEffect, useState } from "react";
import { faEdit, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AccountNavbar from "../../components/AccountNavbar/AccountNavbar";
import { fetchUser, updateUser } from "../../actions/admin-actions";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EditUser = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const rolesData = [
    {
      id: 0,
      value: "ADMIN",
    },
    {
      id: 1,
      value: "USER",
    },
  ];

  const { id } = useParams();
  const history = useHistory();

  const { user, success } = useSelector((state) => state.admin);

  const [editData, setEditData] = useState({
    username: "",
    role: isAdmin ? "ADMIN" : "USER",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, []);

  const handleInputChange = (event) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const fomData = new FormData();
    fomData.set("username", editData.username);
    fomData.set("role", editData.role);
    fomData.set("userId", id);
    console.log(fomData);
    dispatch(updateUser(fomData, history));
  };

  return (
    <div>
      <AccountNavbar />
      <div className="container mt-5">
        <h4>
          <FontAwesomeIcon className="mr-2" icon={faUserEdit} /> User:{" "}
          {user.username}
        </h4>
        {/* {success ? null : (
          <div className="alert alert-warning col-6" role="alert">
            Oops, something went wrong. Please try again!
          </div>
        )} */}
        <form onSubmit={onFormSubmit}>
          <div className="form-group row mt-5">
            <label className="col-sm-2 col-form-label">User name: </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Role: </label>
            <div className="col-sm-6">
              {rolesData.map((role) => {
                return (
                  <div className="form-check form-check-inline" key={role.id}>
                    <label
                      className="form-check-label mr-1"
                      htmlFor="inlineRadio1"
                    >
                      {role.value}
                    </label>
                    <input
                      id="inlineRadio1"
                      type="radio"
                      className="form-check-input"
                      name="role"
                      value={role.value}
                      onChange={handleInputChange}
                      checked={role.value === editData.role}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button type="submit" className="btn btn-dark">
            <FontAwesomeIcon className="mr-2" icon={faEdit} />
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
