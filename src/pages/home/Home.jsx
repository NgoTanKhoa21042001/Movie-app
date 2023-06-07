/* eslint-disable no-unused-vars */
import React from "react";
import HeroBanner from "./heroBanner/HeroBanner";
import "./home.scss";
import Popular from "./popular/Popular";
import TopRated from "./toprate/TopRated";
import Trending from "./trending/Trending";
const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      <div style={{ height: 1000 }}></div>
    </div>
  );
};

export default Home;
