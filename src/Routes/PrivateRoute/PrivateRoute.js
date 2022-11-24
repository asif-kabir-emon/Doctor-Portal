import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { AuthContext } from "../../Contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <>
        <LoadingSpinner></LoadingSpinner>
      </>
    );
  }

  if (user && user.uid) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
