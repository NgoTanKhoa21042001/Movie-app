/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hooks/useFetch";
import "./herobanner.scss";
const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  // change background

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Img src={background} />
      </div>
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nam
            fugiat quidem, minima repellat culpa consectetur ipsa laborum
            laboriosam in omnis ducimus dignissimos mollitia cupiditate corrupti
            saepe at quia aperiam. Explore now.
          </span>
          <div className="searhInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
