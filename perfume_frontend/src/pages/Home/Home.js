import React from "react";
import CarouselImageSlider from "../../components/CarouselImageSlider/CarouselImageSlider";
import SliderBrands from "../../components/SliderBrands/SliderBrands";
import HomePageTheme from "../../components/HomePageTheme/HomePageTheme";
import PerfumeCardsSlider from "../../components/PerfumeCardsSlider/PerfumeCardsSlider";

const Home = () => {
  return (
    <div>
      <CarouselImageSlider />
      <SliderBrands />
      <HomePageTheme />
      <PerfumeCardsSlider />
    </div>
  );
};

export default Home;
