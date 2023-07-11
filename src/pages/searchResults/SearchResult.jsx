/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import { fetchDataFromApi } from "../../utils/api";
import "./searchresult.scss";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  console.log(data, "SEARCH");
  const fetchInitialData = () => {
    setLoading(true);
    // xử lý kết quả trả về từ API
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            // thì hàm sẽ cập nhật dữ liệu bằng cách thêm dữ liệu mới vào results
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);

    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      <Helmet>
        <title>Search Results page</title>
      </Helmet>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, results were not found
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
