import React, { useEffect, useState } from "react";
import "./Menu.css";

import { Route, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  fetchPerfumes,
  fetchPerfumesByPerfumer,
  fetchPerfumesByGender,
  fetchPerfumesByFilterParams,
} from "../../actions/perfume-actions";

import Checkbox from "../../components/Checkbox/Checkbox";
import CheckboxRadio from "../../components/CheckboxRadio/CheckboxRadio";
import MenuCards from "../../components/MenuCards/MenuCards";
import { gender, perfumer, price } from "./MenuData";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  const { perfumes } = useSelector((state) => state.perfume);
  const history = useHistory();

  const [filterData, setFilterData] = useState({
    perfumers: [],
    genders: [],
    prices: [],
  });

  useEffect(() => {
    const perfumeData = history.location.state.id;
    if (perfumeData === "female" || perfumeData === "male") {
      dispatch(fetchPerfumesByGender({ perfumeGender: perfumeData }));
    } else if (perfumeData === "all") {
      dispatch(fetchPerfumes());
    } else if (perfumeData) {
      dispatch(fetchPerfumesByPerfumer({ perfumer: perfumeData }));
    }
    window.scrollTo(0, 0);
  }, []);

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key].id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const getProducts = (value) => {
    console.log(value);
    dispatch(fetchPerfumesByFilterParams(value));
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...filterData };
    newFilters[category] = filters;

    if (category === "prices") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    getProducts(newFilters);
    setFilterData(newFilters);
  };

  return (
    <div className="container d-flex">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Perfumes</h3>
        </div>
        <ul className="list-unstyled components">
          <h5>Brand</h5>
          <li className="active mb-2" id="homeSubmenu">
            <Checkbox
              list={perfumer}
              handleFilters={(filters) => handleFilters(filters, "perfumers")}
            />
          </li>
          <h5>Gender</h5>
          <li className="active mb-2">
            <Checkbox
              list={gender}
              handleFilters={(filters) => handleFilters(filters, "genders")}
            />
          </li>
          <h5>Price</h5>
          <li className="active mb-2">
            <CheckboxRadio
              list={price}
              handleFilters={(filters) => handleFilters(filters, "prices")}
            />
          </li>
        </ul>
      </nav>
      <Route
        exact
        component={() => (
          <MenuCards
            data={perfumes}
            itemsPerPage={16}
            searchByData={[
              { label: "Brand", value: "perfume" },
              { label: "Perfume title", value: "perfumeTitle" },
              { label: "Manufacturer country", value: "country" },
              { label: "Gender", value: "perfumeGender" },
            ]}
          />
        )}
      />
    </div>
  );
};

Menu.propTypes = {
  fetchPerfumes: PropTypes.func.isRequired,
  fetchPerfumesByPerfumer: PropTypes.func.isRequired,
  fetchPerfumesByGender: PropTypes.func.isRequired,
  fetchPerfumesByFilterParams: PropTypes.func.isRequired,
  perfumes: PropTypes.array.isRequired,
};

export default Menu;
