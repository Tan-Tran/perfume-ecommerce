import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const sliderItems = [
  {
    id: "98",
    name: "Photo 1",
    url: "https://i.ibb.co/dkpHPXQ/1million-ENG.jpg",
  },
  {
    id: "59",
    name: "Photo 2",
    url: "https://i.ibb.co/C0vbNcy/dior-ENG.jpg",
  },
];

const CarouselImageSlider = () => {
  const settings = {
    indicators: false,
    fade: false,
    infinite: true,
    interval: 2000,
  };
  return (
    <div>
      <Carousel {...settings}>
        {sliderItems.map((item, index) => {
          return (
            <CarouselItem key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img className="d-block w-100" src={item.url} alt={item.name} />
              </Link>
            </CarouselItem>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselImageSlider;
