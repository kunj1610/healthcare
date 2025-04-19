// Import React library for creating components
import React from "react";

// Import Bootstrap components for layout
import { Container, Row, Col } from "react-bootstrap";

// Import copyright icon from react-icons
import { AiOutlineCopyrightCircle } from "react-icons/ai";

// Import custom footer styles
import "../styles/footer.css";

// Footer component that displays copyright information
function Footer() {
  return (
    // Footer element wrapper
    <footer>
      {/* Bootstrap container for footer content */}
      <Container className="footer-container">
        {/* Single row */}
        <Row>
          {/* Single column */}
          <Col>
            <div>
              {/* Copyright text */}
              <span>Copyright</span>
              {/* Copyright icon wrapper */}
              <span className="copyright-icon">
                <AiOutlineCopyrightCircle />
              </span>
              {/* Dynamic year display with rights reserved text */}
              <span>{new Date().getFullYear()} All rights reserved.</span>
        
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

// Export Footer component as default
export default Footer;
