/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet";
import HeroBanner from "./heroBanner/HeroBanner";
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
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
