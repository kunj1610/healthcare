// Import necessary dependencies from React and React-Bootstrap
import React from "react";
import { Row, Col, Form } from "react-bootstrap";

// Import custom styles for the profile component
import "../styles/profile.css";

// UserProfile component that displays user information in a form layout
function UserProfile(props) {
  return (
    // Main container row
    <Row>
      {/* Title row */}
      <Row>
        <Col sm={4} className="profile-info-title">
          <span>{props.title}</span>
        </Col>
        <Col sm={8}></Col>
      </Row>
      {/* Full Name row */}
      <Row>
        <Col sm={4} className="profile-info-text">
          Full Name
        </Col>
        <Col sm={8}>
          <Form.Control
            type="text"
            placeholder={props.name}
            readOnly
            className="profile-info-form-entry"
          />
        </Col>
      </Row>
      {/* Ethereum Address row */}
      <Row>
        <Col sm={4} className="profile-info-text">
          Ethereum Address
        </Col>
        <Col sm={8}>
          <Form.Control
            className="profile-info-form-entry"
            type="text"
            placeholder={props.address}
            readOnly
          />
        </Col>
      </Row>
    </Row>
  );
}

// Export the UserProfile component for use in other parts of the application
export default UserProfile;
