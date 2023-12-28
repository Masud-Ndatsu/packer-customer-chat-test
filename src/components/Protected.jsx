import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RouteProtector = () => {
     // Get access to the token or whatever you use to as a means of authentication and authorization
     const token = JSON.parse(localStorage.getItem("user"));

     // Check the token and make a decision based on it.
     if (token) {
          // Allow access to the requested url
          return <Outlet />;
     }

     //  Deny access
     return <Navigate to="/login" />;
};

export default RouteProtector;
