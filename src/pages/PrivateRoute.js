import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
  } = useAuth0();
  const isUser = user && isAuthenticated;
  if (!isUser) {
    console.log(isUser);

    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};
export default PrivateRoute;
