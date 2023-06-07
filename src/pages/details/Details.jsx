/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./detail.scss";
const Details = () => {
  const { data, loading } = useFetch(`/${mediaType}/{${id}}`);
  return <div>Details</div>;
};

export default Details;
