// Import React and ReactDOM for rendering
import React from "react";
import ReactDOM from "react-dom";

// Import CSS styles from Bootstrap and Ant Design
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
// Import main App component
import App from "./App";

// Import and configure dotenv for environment variables with config 
import dotenv from "dotenv";
dotenv.config();

// Render the App component into the root DOM element
ReactDOM.render(<App />, document.getElementById("root"));
