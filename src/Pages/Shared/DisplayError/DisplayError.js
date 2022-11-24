import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
        navigate("/");
      })
      .catch((error) => {
        console.error();
      });
  };

  return (
    <div className="text-center mt-20">
      <p className="text-red-400 text-3xl">Something Went Wrong</p>
      <p className="text-red-700 my-2">{error.statusText || error.message}</p>
      <p className="text-3xl">
        Please
        <button onClick={handleLogout} className="text-sky-700 underline mx-2">
          Sign Out
        </button>
        and Login Again.
      </p>
    </div>
  );
};

export default DisplayError;
