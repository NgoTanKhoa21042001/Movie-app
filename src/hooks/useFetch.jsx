/* eslint-disable no-unused-vars */

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    // lấy dữ liệu từ một API
    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("SOmething went wrong");
      });
  }, [url]);
  //  hiển thị dữ liệu, biểu tượng tải, hoặc thông báo lỗi
  return { data, loading, error };
};

export default useFetch;
