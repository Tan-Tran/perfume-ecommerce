import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "../../utils/constants/url";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { fetchPerfume } from "../../actions/perfume-actions";
import { addToCart } from "../../actions/cart-actions";
import { addReviewToPerfume } from "../../actions/user-actions";

const Perfume = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { perfume, reviews } = useSelector((state) => state.perfume);
  const { authorError, messageError } = useSelector(
    (state) => state.user.errors
  );
  const [reviewInfo, setReviewInfo] = useState({
    author: "",
    message: "",
  });

  const addPerfumeToCart = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("isLoggedIn")) {
      history.push("/login");
    } else {
      dispatch(addToCart(perfume, history));
    }
  };

  const addReview = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("perfumeId", id);
    bodyFormData.append("author", reviewInfo.author);
    bodyFormData.append("message", reviewInfo.message);
    dispatch(addReviewToPerfume(bodyFormData));
  };

  const handleInputChange = (event) => {
    setReviewInfo({
      ...reviewInfo,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchPerfume(id));
    }
    window.scroll(0, 0);
  }, []);
  return (
    <div className="container mt-5 pb-5">
      <div className="row">
        <div className="col-md-5">
          <div>
            <img
              src={IMG_URL + `${perfume.filename}`}
              className="rounded mx-auto w-100"
            />
          </div>
        </div>
        <div className="col-md-7">
          <h2>{perfume.perfumeTitle}</h2>
          <h3>{perfume.perfumer}</h3>
          <p>
            Product code: <span>{perfume.id}</span>
          </p>
          <p style={{ color: "#54C0A1" }}>In Stock</p>
          <div className="row ml-1">
            <h6 className="mr-5">
              <span>${perfume.price}</span>.00
            </h6>
            <button
              type="submit"
              className="btn btn-success mx-3"
              onClick={addPerfumeToCart}
            >
              <FontAwesomeIcon className="mr-2 fa-lg" icon={faCartPlus} /> ADD
              TO CART
            </button>
          </div>
          <br />
          <table className="table">
            <tbody>
              <tr>
                <td>Perfume title:</td>
                <td>{perfume.perfumeTitle}</td>
              </tr>
              <tr>
                <td>Brand:</td>
                <td>{perfume.perfume}</td>
              </tr>
              <tr>
                <td>Perfume type:</td>
                <td>{perfume.type}</td>
              </tr>
              <tr>
                <td>Release year:</td>
                <td>{perfume.year}</td>
              </tr>
              <tr>
                <td>Volume:</td>
                <td>
                  <span>{perfume.volume}</span> ml.
                </td>
              </tr>
              <tr>
                <td>Manufacturer country:</td>
                <td>{perfume.country}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{perfume.perfumeGender}</td>
              </tr>
              <tr>
                <td>Top notes:</td>
                <td>{perfume.fragranceTopNotes}</td>
              </tr>
              <tr>
                <td>Heart notes:</td>
                <td>{perfume.fragranceMiddleNotes}</td>
              </tr>
              <tr>
                <td>Base notes:</td>
                <td>{perfume.fragranceBaseNotes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-center mb-5">REVIEWS</h3>
        {reviews.length === 0 ? (
          <p className="text-center">There are no reviews for this perfume.</p>
        ) : (
          reviews.map((review) => {
            return (
              <div key={review.id}>
                <div className="form row mt-5">
                  <div className="col-3">
                    <p>
                      <b>{review.author}</b>
                    </p>
                    <p>{review.date}</p>
                  </div>
                  <div className="col">
                    <p>{review.message}</p>
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        )}
        <form onSubmit={addReview}>
          <div className="form-group border mt-5">
            <div className="mx-3 my-3">
              <label>
                <span className="text-danger">
                  <b>*</b>
                </span>{" "}
                Your name
              </label>
              <input
                type="text"
                className={
                  authorError ? "form-control is-invalid" : "form-control"
                }
                name="author"
                value={reviewInfo.author}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{authorError}</div>
              <label>
                <span className="text-danger">
                  <b>*</b>
                </span>{" "}
                Message text
              </label>
              <textarea
                rows="4"
                className={
                  messageError ? "form-control is-invalid" : "form-control"
                }
                name="message"
                value={reviewInfo.message}
                style={{ resize: "none" }}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{messageError}</div>
              <button type="submit" className="btn btn-dark mt-3">
                <FontAwesomeIcon className="mr-2" icon={faPaperPlane} />
                Post a review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfume;
