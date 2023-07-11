/* eslint-disable no-unused-vars */

import React, { Suspense } from "react";
import { useState } from "react";
// import Carousel from "../../../components/carousel/Carousel";
const Carousel = React.lazy(() =>
  import("../../../components/carousel/Carousel")
);
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import "./trending.scss";
const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}
  `);
  console.log(data, "trending");
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Suspense>
        <Carousel data={data?.results} loading={loading} />
      </Suspense>
    </div>
  );
};

export default Trending;
