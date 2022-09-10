import React, { useState } from "react";
import "../../pages/Menu/Menu.css";

const Checkbox = (props) => {
  const { handleFilters, list } = props;
  const [selectList, setSelectList] = useState([]);

  const handleToggle = (value) => {
    const newSelectList = [...selectList];
    const currentIndex = newSelectList.indexOf(value);
    if (currentIndex == -1) {
      newSelectList.push(value);
    } else {
      newSelectList.splice(currentIndex, 1);
    }
    setSelectList(newSelectList);
    handleFilters(newSelectList);
  };

  const renderCheckboxLists = () =>
    list &&
    list.map((value, index) => {
      return (
        <li key={index}>
          <div className="checkbox ml-3">
            <label>
              <input
                onChange={() => handleToggle(value.name)}
                type="checkbox"
                checked={selectList.indexOf(value.name) === -1 ? false : true}
              />
              <span className="cr">
                <i className="cr-icon fas fa-check"></i>
              </span>
              {value.name}
            </label>
          </div>
        </li>
      );
    });

  return <ul className="list-unstyled">{renderCheckboxLists()}</ul>;
};

export default Checkbox;
