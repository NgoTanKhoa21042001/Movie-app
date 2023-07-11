/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
// import HeroBanner from "./heroBanner/HeroBanner";
const HeroBanner = React.lazy(() => import("./heroBanner/HeroBanner"));
import "./home.scss";
import Popular from "./popular/Popular";
import TopRated from "./toprate/TopRated";
import Trending from "./trending/Trending";
const Home = () => {
  return (
    <div className="homePage">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Suspense>
        <HeroBanner />
      </Suspense>
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
