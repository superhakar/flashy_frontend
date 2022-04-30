import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


export const Landing = () => {
  const authState = useSelector((state) => state.AuthReducer);
  if (authState.authStatus === "Success") {
    return <Redirect to="/home" />;
  }
  return <section className="landing"></section>;
};

 