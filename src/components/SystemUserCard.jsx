// Import necessary dependencies from React and React-Bootstrap
import React from "react";
import { Row, Col } from "react-bootstrap";

// Import custom styles for the system user card component
import "../styles/systemUserCard.css";

// SystemUserCard component that displays user information in a card layout
function SystemUserCard(props) {
  return (
    <>
      {/* Main card container */}
      <div className="card-container">
        {/* Image row */}
        <Row>
          <Col>
            <div className="card-img">{props.image}</div>
          </Col>
        </Row>
        {/* Username row */}
        <Row>
          <Col>
            <div className="card-user">{props.user}</div>
          </Col>
        </Row>
        {/* Button row */}
        <Row>
          <Col>
            <div className="card-button">{props.button}</div>
          </Col>
        </Row>
        {/* Empty row for spacing */}
        <Row>
          <Col></Col>
        </Row>
      </div>
    </>
  );
}

// Export the SystemUserCard component for use in other parts of the application
export default SystemUserCard;
