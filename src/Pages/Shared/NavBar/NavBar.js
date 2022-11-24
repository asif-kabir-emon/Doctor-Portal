import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
      })
      .catch((error) => {
        console.error();
      });
  };

  const mentItems = (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/appointment">Appointment</Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="btn rounded-xl text-white"
            >
              SignOut
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <label
        tabIndex={1}
        htmlFor="dashboard-drawer"
        className="btn btn-ghost hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <div className="navbar-start">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          Doctors Portal
        </Link>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{mentItems}</ul>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 -left-40"
          >
            {mentItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
