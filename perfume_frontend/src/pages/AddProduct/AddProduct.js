import React, { useEffect, useState } from "react";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ToastShow from "../../components/ToastShow/ToastShow";
import AccountNavbar from "../../components/AccountNavbar/AccountNavbar";
import { addPerfume, formReset } from "../../actions/admin-actions";
import { useDispatch, useSelector } from "react-redux";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { errors, success } = useSelector((state) => state.admin);

  const [perfume, setPerfume] = useState({
    perfumeTitle: "",
    perfumer: "",
    year: "",
    country: "",
    type: "",
    volume: "",
    perfumeGender: "",
    fragranceTopNotes: "",
    fragranceMiddleNotes: "",
    fragranceBaseNotes: "",
    price: "",
    file: null,
    showToast: false,
  });

  const {
    perfumeTitle,
    perfumer,
    year,
    country,
    type,
    volume,
    perfumeGender,
    fragranceTopNotes,
    fragranceMiddleNotes,
    fragranceBaseNotes,
    price,
    file,
    showToast,
  } = perfume;

  const {
    perfumeTitleError,
    perfumerError,
    yearError,
    countryError,
    typeError,
    volumeError,
    perfumeGenderError,
    fragranceTopNotesError,
    fragranceMiddleNotesError,
    fragranceBaseNotesError,
    priceError,
  } = errors;

  useEffect(() => {
    dispatch(formReset());
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("perfumeTitle", perfumeTitle);
    bodyFormData.append("perfumer", perfumer);
    bodyFormData.append("year", year);
    bodyFormData.append("country", country);
    bodyFormData.append("type", type);
    bodyFormData.append("volume", volume);
    bodyFormData.append("perfumeGender", perfumeGender);
    bodyFormData.append("fragranceTopNotes", fragranceTopNotes);
    bodyFormData.append("fragranceMiddleNotes", fragranceMiddleNotes);
    bodyFormData.append("fragranceBaseNotes", fragranceBaseNotes);
    bodyFormData.append("price", price);

    dispatch(addPerfume(bodyFormData)).then(() => {
      if (success) {
        this.setPerfume({
          ...perfume,
          showToast: true,
        });
      }
      setTimeout(() => setPerfume({ ...perfume, showToast: false }), 5000);
      window.scrollTo(0, 0);
    });
  };

  const handleInputChange = (event) => {
    setPerfume({
      ...perfume,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setPerfume({
      ...perfume,
      file: event.target.files[0],
    });
  };

  return (
    <div>
      <AccountNavbar />
      <div
        className="container"
        style={{ display: showToast ? "block" : "none" }}
      >
        <ToastShow
          showToast={showToast}
          message={"Perfume successfully added!"}
        />
      </div>
      <div className="container mt-5">
        <h4>
          <FontAwesomeIcon className="mr-2" icon={faPlusSquare} />
          Add perfume
        </h4>
        <br />
        <form onSubmit={onFormSubmit}>
          <div className="form row">
            <div className="col">
              <label>Perfume title: </label>
              <input
                type="text"
                className={
                  perfumeTitleError ? "form-control is-invalid" : "form-control"
                }
                name="perfumeTitle"
                value={perfumeTitle}
                placeholder="Enter the perfume title"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{perfumeTitleError}</div>
            </div>
            <div className="col">
              <label>Brand: </label>
              <input
                type="text"
                className={
                  perfumerError ? "form-control is-invalid" : "form-control"
                }
                name="perfumer"
                value={perfumer}
                placeholder="Enter the brand"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{perfumerError}</div>
            </div>
          </div>
          <div className="form row mt-3">
            <div className="col">
              <label>Release year: </label>
              <input
                type="text"
                className={
                  yearError ? "form-control is-invalid" : "form-control"
                }
                name="year"
                value={year}
                placeholder="Enter the release year"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{yearError}</div>
            </div>
            <div className="col">
              <label>Manufacturer country: </label>
              <input
                type="text"
                className={
                  countryError ? "form-control is-invalid" : "form-control"
                }
                name="country"
                value={country}
                placeholder="Enter the manufacturer country"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{countryError}</div>
            </div>
          </div>
          <div className="form row mt-3">
            <div className="col">
              <label>Perfume type: </label>
              <input
                type="text"
                className={
                  typeError ? "form-control is-invalid" : "form-control"
                }
                name="type"
                value={type}
                placeholder="Enter the perfume type"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{typeError}</div>
            </div>
            <div className="col">
              <label>Volume: </label>
              <input
                type="text"
                className={
                  volumeError ? "form-control is-invalid" : "form-control"
                }
                name="volume"
                value={volume}
                placeholder="Enter the volume"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{volumeError}</div>
            </div>
          </div>
          <div className="form row mt-3">
            <div className="col">
              <label>Gender: </label>
              <input
                type="text"
                className={
                  perfumeGenderError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="perfumeGender"
                value={perfumeGender}
                placeholder="Enter the gender"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{perfumeGenderError}</div>
            </div>
            <div className="col">
              <label>Top notes: </label>
              <input
                type="text"
                className={
                  fragranceTopNotesError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="fragranceTopNotes"
                value={fragranceTopNotes}
                placeholder="Enter the top notes"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{fragranceTopNotesError}</div>
            </div>
          </div>
          <div className="form row mt-3">
            <div className="col">
              <label>Heart notes: </label>
              <input
                type="text"
                className={
                  fragranceMiddleNotesError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="fragranceMiddleNotes"
                value={fragranceMiddleNotes}
                placeholder="Enter the heart notes"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {fragranceMiddleNotesError}
              </div>
            </div>
            <div className="col">
              <label>Base notes: </label>
              <input
                type="text"
                className={
                  fragranceBaseNotesError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="fragranceBaseNotes"
                value={fragranceBaseNotes}
                placeholder="Enter the base notes"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{fragranceBaseNotesError}</div>
            </div>
          </div>
          <div className="form row mt-3">
            <div className="col">
              <label>Price: </label>
              <input
                type="text"
                className={
                  priceError ? "form-control is-invalid" : "form-control"
                }
                name="price"
                value={price}
                placeholder="Enter the price"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{priceError}</div>
            </div>
            <div className="col" style={{ marginTop: "35px" }}>
              <input type="file" name="file" onChange={handleFileChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-dark mt-3">
            <FontAwesomeIcon className="mr-2" icon={faPlusSquare} />
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
