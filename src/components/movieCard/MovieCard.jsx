/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircleRating from "../circleRating/CircleRating";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadImage/Img";
import Genres from "../genres/Genres";
import dayjs from "dayjs";
import "./moviecard.scss";
const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;