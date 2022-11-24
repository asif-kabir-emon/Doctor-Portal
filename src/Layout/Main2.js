import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const Main2 = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main2;
