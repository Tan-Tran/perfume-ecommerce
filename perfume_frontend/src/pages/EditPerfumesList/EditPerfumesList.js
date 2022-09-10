import React, { useEffect } from "react";

import EditPerfumes from "./EditPerfumes";

import { fetchPerfumes } from "../../actions/perfume-actions";
import { useDispatch, useSelector } from "react-redux";

const EditPerfumesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPerfumes());
  }, []);

  const { perfumes } = useSelector((state) => state.perfume);

  const itemsPerPage = 24;

  const searchByData = [
    { label: "Brand", value: "perfume" },
    { label: "Perfume title", value: "perfumeTitle" },
    { label: "Manufacturer country", value: "country" },
    { label: "Gender", value: "perfumeGender" },
  ];

  return (
    <EditPerfumes
      data={perfumes}
      itemsPerPage={itemsPerPage}
      searchByData={searchByData}
    />
  );
};

export default EditPerfumesList;
