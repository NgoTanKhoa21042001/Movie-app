/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PosterFallback from "../../../assets/no-poster.png";
import CircleRating from "../../../components/circleRating/CircleRating";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoadImage/Img";
import VideoPopup from "../../../components/videopopup/VideoPopup";
import useFetch from "../../../hooks/useFetch";
import "./detailbanner.scss";
import { PlayIcon } from "../Playbtn";
const DetailBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  console.log(data, "data");
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  console.log(director, "director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {/* Nếu biến data tồn tại, nó sẽ render một phần tử React.Fragment */}
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${data.title} (${dayjs(
                      data?.release_date
                    ).format("YYYY")})`}</div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed()} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span>
                          <div className="text">Watch Trailer</div>
                        </span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          {" "}
                          <span className="text bold">Status: {""}</span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          {" "}
                          <span className="text bold">Released Date: {""}</span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          {" "}
                          <span className="text bold">Run Times: {""}</span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: {""}</span>
                        <span className="text">
                          {director.map((d, i) => (
                            <span key={i}>{d.name}</span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: {""}</span>
                        <span className="text">
                          {writer.map((w, i) => (
                            <span key={i}>
                              {w.name} {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailBanner;
