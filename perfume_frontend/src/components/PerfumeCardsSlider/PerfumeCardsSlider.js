import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { IMG_URL } from "../../utils/constants/url";
import { fetchPerfumes } from "../../actions/perfume-actions";
import "./PerfumeCardsSlider.css";

const PerfumeCardsSlider = () => {
  const dispatch = useDispatch();
  const perfumes = useSelector((state) => state.perfume.perfumes);

  useEffect(() => {
    dispatch(fetchPerfumes());
  }, []);

  const settings = { controls: false };

  const addCarouselItems = (array, counter) => {
    const perfumesId = [39, 56, 119, 59, 47, 95, 89, 98, 52, 40, 92, 99];
    return (
      <Carousel.Item>
        {array.map((perfume) => {
          for (let i = counter; i < counter + 4; i++) {
            if (perfume.id === perfumesId[i]) {
              return (
                <div className="card" key={perfume.id}>
                  <img
                    className="d-block mx-auto w-50"
                    src={IMG_URL + `${perfume.filename}`}
                  />
                  <div className="card-body text-center">
                    <h5>{perfume.perfumeTitle}</h5>
                    <h6>{perfume.perfumer}</h6>
                    <h6>
                      $<span>{perfume.price}</span>.00
                    </h6>
                    <Link to={`/product/${perfume.id}`}>
                      <span className="btn btn-dark">SHOW MORE</span>
                    </Link>
                  </div>
                </div>
              );
            }
          }
        })}
      </Carousel.Item>
    );
  };

  return (
    <div>
      <div className="container text-center my-3">
        <h3>PERSONALLY RECOMMENDED</h3>
      </div>
      <div className="container mt-5" id="indicators">
        <form method="get" action="/">
          <Carousel {...settings}>
            {addCarouselItems(perfumes, 0)}
            {addCarouselItems(perfumes, 4)}
            {addCarouselItems(perfumes, 8)}
          </Carousel>
        </form>
      </div>
    </div>
  );
};

PerfumeCardsSlider.propTypes = {
  fetchPerfumes: PropTypes.func.isRequired,
  perfumes: PropTypes.array.isRequired,
};

export default PerfumeCardsSlider;
