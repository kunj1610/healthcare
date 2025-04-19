// Import necessary dependencies from React and other libraries
import React from "react";
import { useHistory } from "react-router-dom";

// Import icon and layout components
import { LeftSquareOutlined } from "@ant-design/icons";
import { Col } from "react-bootstrap";

// GoBackBtn component that provides navigation to previous page
export default function GoBackBtn(props) {
  // Get history object for navigation
  let history = useHistory();

  return (
    // Column container with flex layout
    <Col
      style={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Back arrow icon with click handler */}
      <span
        style={{
          fontSize: "30px",
          flexGrow: "0.1",
          textAlign: "center",
          cursor: "pointer",
          color:"#57625f",
        }}
        onClick={() => history.push(props.path)}
      >
        <LeftSquareOutlined />
      </span>
      {/* "Go Back" text label */}
      <span
        style={{
          flexGrow: "1",
          fontSize: "20px",
          fontWeight: "500",
          color: "#57625f",
        }}
      >
        Go Back
      </span>
    </Col>
  );
}
