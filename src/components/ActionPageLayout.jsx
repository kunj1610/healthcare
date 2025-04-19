// Import React library for component creation
import React from "react";

// Import Bootstrap layout components
import { Row, Col, Container } from "react-bootstrap";

// Import custom layout components
import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";

// Import component-specific styles
import "../styles/actionPageLayout.css";

/**
 * ActionPageLayout component that provides a two-column layout
 * @param {Object} props - Component props
 * @param {ReactNode} props.actions - Content for the actions sidebar
 * @param {ReactNode} props.content - Main content to display
 * @returns {ReactElement} Rendered component
 */
function ActionPageLayout(props) {
  return (
    <Layout>
      <MainContainer>
        <Container>
          <Row>
            {/* Left sidebar for action buttons/links */}
            <Col sm={3} className="action-container">
              <p className="action-title">Actions</p>
              {props.actions}
            </Col>
            {/* Main content area */}
            <Col sm={8} className="nav-container">
              {/* <p className="action-title">Navigation</p> */}
              {props.content}
            </Col>
          </Row>
        </Container>
      </MainContainer>
    </Layout>
  );
}

export default ActionPageLayout;
