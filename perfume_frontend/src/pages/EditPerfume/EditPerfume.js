import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import AccountNavbar from "../../components/AccountNavbar/AccountNavbar";
import { IMG_URL } from "../../utils/constants/url";
import { updatePerfume, formReset } from "../../actions/admin-actions";
import { fetchPerfume } from "../../actions/perfume-actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const EditPerfume = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(formReset());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchPerfume(id));
    }
  }, [id]);

  const { errors } = useSelector((state) => state.admin);

  const { perfume } = useSelector((state) => state.perfume);

  const [newPerfumeData, setNewPerfumeData] = useState({
    id: "",
    perfumeTitle: "",
    perfumer: "",
    perfume: "",
    year: "",
    country: "",
    type: "",
    volume: "",
    perfumeGender: "",
    fragranceTopNotes: "",
    fragranceMiddleNotes: "",
    fragranceBaseNotes: "",
    price: "",
    filename: "",
    file: null,
  });

  useEffect(() => {
    setNewPerfumeData({
      ...perfume,
      perfumer: perfume.perfume,
    });
  }, [perfume]);

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

  const onFormSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData();
    const updateFileName = newPerfumeData.filename
      ? perfume.filename
      : newPerfumeData.filename;

    bodyFormData.append("filename", updateFileName);
    bodyFormData.append("file", newPerfumeData.file);
    bodyFormData.append("id", newPerfumeData.id);
    bodyFormData.append("perfumeTitle", newPerfumeData.perfumeTitle);
    // This is chit code - because field name is duplicate with class name in database.
    // Controller admin/edit use @Valid to verify entity Perfume. In Perfume has "perfume" field => cause conflict when validate data.
    bodyFormData.append("perfumer", newPerfumeData.perfumer);
    bodyFormData.append("perfume", 1);
    //
    bodyFormData.append("year", newPerfumeData.year);
    bodyFormData.append("country", newPerfumeData.country);
    bodyFormData.append("type", newPerfumeData.type);
    bodyFormData.append("volume", newPerfumeData.volume);
    bodyFormData.append("perfumeGender", newPerfumeData.perfumeGender);
    bodyFormData.append("fragranceTopNotes", newPerfumeData.fragranceTopNotes);
    bodyFormData.append(
      "fragranceMiddleNotes",
      newPerfumeData.fragranceMiddleNotes
    );
    bodyFormData.append(
      "fragranceBaseNotes",
      newPerfumeData.fragranceBaseNotes
    );

    bodyFormData.append("price", newPerfumeData.price);

    dispatch(updatePerfume(bodyFormData, history));
  };

  const handleFileChange = (event) => {
    setNewPerfumeData({
      ...newPerfumeData,
      file: event.target.files[0],
    });
  };
  const handleInputChange = (event) => {
    setNewPerfumeData({
      ...newPerfumeData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <AccountNavbar />
      <div className="container mt-5">
        <h4>
          <FontAwesomeIcon className="mr-2" icon={faEdit} />
          Edit perfume
        </h4>
        <form onSubmit={onFormSubmit}>
          <div className="col-md-5 mb-5 mt-5">
            <img
              src={IMG_URL + `${newPerfumeData.filename}`}
              className="rounded mx-auto w-100 mb-2"
            />
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Perfume title: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  perfumeTitleError ? "form-control is-invalid" : "form-control"
                }
                name="perfumeTitle"
                value={newPerfumeData.perfumeTitle}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{perfumeTitleError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Brand: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  perfumerError ? "form-control is-invalid" : "form-control"
                }
                name="perfumer"
                value={newPerfumeData.perfumer}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{perfumerError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Release year: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  yearError ? "form-control is-invalid" : "form-control"
                }
                name="year"
                value={newPerfumeData.year}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{yearError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Manufacturer country:{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  countryError ? "form-control is-invalid" : "form-control"
                }
                name="country"
                value={newPerfumeData.country}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{countryError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Perfume type: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  typeError ? "form-control is-invalid" : "form-control"
                }
                name="type"
                value={newPerfumeData.type}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{typeError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Volume: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  volumeError ? "form-control is-invalid" : "form-control"
                }
                name="volume"
                value={newPerfumeData.volume}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{volumeError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Gender: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  perfumeGenderError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="perfumeGender"
                value={newPerfumeData.perfumeGender}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{perfumeGenderError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Top notes: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  fragranceTopNotesError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="fragranceTopNotes"
                value={newPerfumeData.fragranceTopNotes}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{fragranceTopNotesError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Heart notes: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  fragranceMiddleNotesError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="fragranceMiddleNotes"
                value={newPerfumeData.fragranceMiddleNotes}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {fragranceMiddleNotesError}
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Base notes: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  fragranceBaseNotesError
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="fragranceBaseNotes"
                value={newPerfumeData.fragranceBaseNotes}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{fragranceBaseNotesError}</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Price: </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={
                  priceError ? "form-control is-invalid" : "form-control"
                }
                name="price"
                value={newPerfumeData.price}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{priceError}</div>
            </div>
          </div>
          <button type="submit" className="btn btn-dark">
            <FontAwesomeIcon className="mr-2" icon={faEdit} />
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPerfume;
