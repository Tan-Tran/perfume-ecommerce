import React from "react";

import usePagination from "../PaginationItem/usePagination";
import PerfumeCardItem from "../PerfumeCardItem/PerfumeCardItem";
import PaginationItem from "../PaginationItem/PaginationItem";
import SearchForm from "../SearchForm/SearchForm";

const MenuCards = ({ data, itemsPerPage, startFrom, searchByData }) => {
  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    setFilteredData,
    setSearching,
  } = usePagination({
    itemsPerPage,
    data,
    startFrom,
  });

  return (
    <div className="container">
      <div className="mt-5 ml-2">
        <SearchForm
          data={data}
          searchByData={searchByData}
          setFilteredData={setFilteredData}
          setSearching={setSearching}
        />
      </div>
      {slicedData.length === 0 ? (
        <div className="mt-5 ml-2">Not found product</div>
      ) : (
        <div className="mt-3 ml-2">
          <div>
            <PaginationItem
              pagination={pagination}
              prevPage={prevPage}
              changePage={changePage}
              nextPage={nextPage}
            />
            <div className="row">
              {slicedData.map((perfume) => {
                return (
                  <PerfumeCardItem
                    perfume={perfume}
                    colSize={3}
                    link={"/product"}
                    btnName={"SHOW MORE"}
                    key={perfume.id}
                  />
                );
              })}
            </div>
            <PaginationItem
              pagination={pagination}
              prevPage={prevPage}
              changePage={changePage}
              nextPage={nextPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCards;
