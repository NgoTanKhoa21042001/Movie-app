/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Recommendations from "./carousel/Recommendation";
import Similar from "./carousel/Similar";
import Cast from "./cast/Cast";
import "./detail.scss";
// import DetailBanner from "./detailBanner/DetailBanner";
const DetailBanner = React.lazy(() => import("./detailBanner/DetailBanner"));
import VideoSection from "./videoSection/VideoSection";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  console.log(data);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <Suspense>
        <DetailBanner video={data?.results?.[0]} crew={credits?.crew} />
      </Suspense>
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
