/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./detail.scss";
import DetailBanner from "./detailBanner/DetailBanner";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew} />
    </div>
  );
};

export default Details;
