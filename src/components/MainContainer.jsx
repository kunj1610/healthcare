// Import necessary dependencies from React
import React from "react";

// Import custom styles for the main container
import "../styles/mainContainer.css";

// MainContainer component that provides consistent layout wrapper
function MainContainer(props) {
  // Render main content area with children passed as props
  return <main>{props.children}</main>;
}

// Export the MainContainer component
export default MainContainer;
