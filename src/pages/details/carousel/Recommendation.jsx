/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendations = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
  console.log(data);

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      endpoint={mediaType}
      loading={loading}
    />
  );
};

export default Recommendations;
