import React, { useState } from "react";

const CheckboxRadio = ({ handleFilters, list }) => {
  const [value, setValue] = useState("0");

  const renderRadioBox = () =>
    list &&
    list.map((value) => {
      return (
        <div key={value.id} className="checkbox ml-3">
          <label>
            <input type="radio" name="price" value={`${value.id}`} />
            <span className="cr">
              <i className="cr-icon fas fa-check"></i>
            </span>
            {value.name}
          </label>
        </div>
      );
    });

  const changeHandler = (event) => {
    setValue(event.target.value);
    handleFilters(event.target.value);
  };
  return (
    <ul className="list-unstyled">
      <li onChange={changeHandler} value={value}>
        {renderRadioBox()}
      </li>
    </ul>
  );
};

export default CheckboxRadio;
