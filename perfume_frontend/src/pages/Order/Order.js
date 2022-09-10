import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

import { IMG_URL } from "../../utils/constants/url";
import { fetchOrder, addOrder } from "../../actions/order-actions";
import { validateEmail } from "../../utils/input-validators";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Order = () => {
  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  const dispatch = useDispatch();

  const history = useHistory();

  const { perfumes, errors } = useSelector((state) => state.order);

  const [orderInfo, setOrderInfo] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    postIndex: "",
    phoneNumber: "",
    email: localStorage.getItem("email") || "",
    validateEmailError: "",
  });

  const {
    firstNameError,
    lastNameError,
    cityError,
    addressError,
    postIndexError,
    phoneNumberError,
    emailError,
  } = errors;

  const totalPrice = perfumes.reduce((total, item) => total + item.price, 0);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      city,
      address,
      postIndex,
      phoneNumber,
      email,
    } = orderInfo;

    const validateEmailError = validateEmail(email);

    if (validateEmailError.length !== 0) {
      setOrderInfo({
        ...orderInfo,
        validateEmailError: validateEmailError,
      });
    } else {
      setOrderInfo({
        ...orderInfo,
        validateEmailError: "",
      });
      //   const perfumeList = perfumes;
      const order = {
        firstName,
        lastName,
        city,
        address,
        postIndex,
        phoneNumber,
        email,
        perfumeList: perfumes,
        totalPrice,
      };
      console.log(order);
      dispatch(addOrder(order, history));
    }
  };

  const handleInputChange = (event) => {
    setOrderInfo({
      ...orderInfo,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="container mt-5 pb-5">
      <h4 className="mb-4 text-center">
        <FontAwesomeIcon className="mr-2" icon={faShoppingBag} /> Ordering
      </h4>
      <br />
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Name:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={
                    firstNameError ? "form-control is-invalid" : "form-control"
                  }
                  name="firstName"
                  value={orderInfo.firstName}
                  placeholder="Enter the first name"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{firstNameError}</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Surname:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={
                    lastNameError ? "form-control is-invalid" : "form-control"
                  }
                  name="lastName"
                  value={orderInfo.lastName}
                  placeholder="Enter the last name"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{lastNameError}</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">City:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={
                    cityError ? "form-control is-invalid" : "form-control"
                  }
                  name="city"
                  value={orderInfo.city}
                  placeholder="Enter the city"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{cityError}</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Address:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={
                    addressError ? "form-control is-invalid" : "form-control"
                  }
                  name="address"
                  value={orderInfo.address}
                  placeholder="Enter the address"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{addressError}</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Index:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={
                    postIndexError ? "form-control is-invalid" : "form-control"
                  }
                  name="postIndex"
                  value={orderInfo.postIndex}
                  placeholder="Enter the index"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{postIndexError}</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Mobile:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={
                    phoneNumberError
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="phoneNumber"
                  value={orderInfo.phoneNumber}
                  placeholder="(___)-___-____"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{phoneNumberError}</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Email:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={
                    emailError || orderInfo.validateEmailError
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="email"
                  value={orderInfo.email}
                  placeholder="example@gmail.com"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {emailError || orderInfo.validateEmailError}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="container-fluid">
              <div className="row">
                {perfumes.map((perfume) => {
                  return (
                    <div
                      key={perfume.id}
                      className="col-lg-6 d-flex align-items-stretch"
                    >
                      <div className="card mb-5">
                        <img
                          src={IMG_URL + `${perfume.filename}`}
                          className="rounded mx-auto w-50"
                        />
                        <div className="card-body text-center">
                          <h5>{perfume.perfumeTitle}</h5>
                          <h6>{perfume.perfumer}</h6>
                          <h6>
                            <span>$ {perfume.price}</span>.00
                          </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-success px-5 float-right"
            >
              <FontAwesomeIcon icon={faCheckCircle} /> Validate order
            </button>
            <div className="row">
              <h4>
                To pay : $ <span>{totalPrice}</span>.00
              </h4>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
