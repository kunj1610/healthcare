// Import necessary dependencies from React
import React, { useState, useEffect } from "react";

// Import styles
import "./App.css";

// Import routing components from react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import page components
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/Protected.route";

import LandingPage from "./pages/LandingPage";
import IssueUserID from "./pages/issueUserID/IssueUserID";
import HomePage from "./pages/HomePage";

import Home from "./pages";

// Load environment variables
require("dotenv").config();

// Main App component that handles routing
function App() {
  // State for storing items
  const [items, setItems] = useState([]);
 
  return (
    <>
      {/* Router wrapper for handling navigation */}
      <Router>
        {/* Switch component to render only first matching route */}
        <Switch>
          {/* Route for home page */}
          <Route exact path="/" component={Home} />
          {/* Route for issuing user ID */}
          <Route exact path="/issueUserID" component={IssueUserID} />
          {/* Protected route that requires authentication */}
          <ProtectedRoute path="/home" component={HomePage} />
          {/* Catch-all route for 404 errors */}
          <Route path="*" component={PageNotFound} />
       
        </Switch>
      </Router> 
    </>
  );
}

// Export App component
export default App;
