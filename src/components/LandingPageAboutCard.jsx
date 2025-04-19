// Import necessary dependencies from React
import React from "react";

// Import Row and Col components from react-bootstrap for layout
import { Row, Col } from "react-bootstrap";
// Import icons from react-icons library
import { FcInfo } from "react-icons/fc";
import { BsLink45Deg } from "react-icons/bs";

// Import Divider component from Ant Design
import { Divider } from "antd";

// Import custom styles for the landing page about card
import "../styles/landingPageAboutCard.css";

// LandingPageAboutCard component that displays information cards on landing page
function LandingPageAboutCard(props) {
  return (
    // Main container for the about card
    <div className="about-card-container">
      {/* Info icon at the top */}
      <FcInfo style={{ fontSize: "20px" }} />
      {/* Row for custom icon passed as prop */}
      <Row>
        <Col>
          {" "}
          <div className="about-card-icon-container">{props.icon}</div>
        </Col>
      </Row>
      {/* Row for card title */}
      <Row>
        <Col>
          <div className="about-card-title">{props.title}</div>
        </Col>
      </Row>
      {/* Row for card description */}
      <Row>
        <Col>
          <div className="about-card-description">{props.description}</div>
        </Col>
      </Row>
      {/* Row for divider line */}
      <Row>
        <Col>
          <Divider />
        </Col>
      </Row>
      {/* Row for "Learn More" link */}
      <Row>
        <Col>
          <div>
            <a href={props.link} target="_blank" rel="noreferrer">
              <BsLink45Deg /> Learn More{" "}
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}

// Export the LandingPageAboutCard component
export default LandingPageAboutCard;
