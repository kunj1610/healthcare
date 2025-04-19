// Import necessary dependencies from React and React Router
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Import custom auth adapter
import auth from "../adapters/auth";

// Protected Route component that checks if user is authenticated
// If authenticated, renders the protected component
// If not authenticated, redirects to home page
function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          // Check if user is authenticated
          if (auth.isAuthenticated()) {
            // If authenticated, render the protected component
            return <Component {...props} />;
          } else {
            // If not authenticated, redirect to home page
            // Store the attempted location so we can redirect back after login
            return (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
            );
          }
        }}
      />
    </>
  );
}

// Export the ProtectedRoute component
export default ProtectedRoute;
