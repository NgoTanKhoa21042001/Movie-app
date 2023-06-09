/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import VideoPopup from "../../../components/videopopup/VideoPopup";
import { PlayIcon } from "../Playbtn";
import "./videodection.scss";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Offical Videos</div>

        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
                }}
              >
                <div className="videoThumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        videoId={videoId}
        setShow={setShow}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
