/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  console.log(data);
  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  return (
    <Carousel
      title={title}
      data={data?.results}
      endpoint={mediaType}
      loading={loading}
    />
  );
};

export default Similar;
