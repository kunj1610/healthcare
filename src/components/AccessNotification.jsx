import React, { useState } from "react";

import { Form } from "react-bootstrap";

import { notification } from "antd"; // For showing notifications

import { Container, Button, Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group"; // For animation effects

import "../styles/accessNotification.css";

// Function to show notification messages
const openNotification = (message, placement) => {
  notification.info({
    message: `Notification`,
    description: message,
    placement,
  });
};

// Component for handling access request notifications
function AccessNotification({accessType, ...restProps}) {
  // State to control visibility of notification
  const [showMessage, setShowMessage] = useState(true);

  // Handler for granting access
  function handleGrant() {
    openNotification("request access granted !", "bottomRight");
    setShowMessage(false);
  }

  // Handler for denying access
  function handleDeny() {
    openNotification("request access denied !", "bottomRight");
    setShowMessage(false);
  }

  return (
    <>
      {/* Main container with top padding */}
      <Container style={{ paddingTop: "1rem" }}>
        {/* Animation wrapper for alert */}
        <CSSTransition
          in={showMessage}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          {/* Alert component with custom styling */}
          <Alert
            style={{
              boxShadow: "#e2fad6 5px 5px 5px 5px",
              backgroundColor:"#fafafa",
            }}
            variant="light"
          >
            <Alert.Heading>Request Access</Alert.Heading>
            {/* Display access type */}
            <p style={{float:"right"}}>Access Type: {accessType} </p>

            {/* Form for displaying Ethereum address */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ethereum Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="0x897Fd668E8adfF344D52104A699187096aD17645"
                readOnly
              />
              <Form.Text className="text-muted">
                This may not be a verified user requesting access.
              </Form.Text>
            </Form.Group>
            {/* Action buttons container */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ margin: "5px" }}
                onClick={handleGrant}
                variant="primary"
              >
                Accept
              </Button>
              <Button
                style={{ margin: "5px" }}
                onClick={handleDeny}
                variant="danger"
              >
                Deny
              </Button>
            </div>
          </Alert>
        </CSSTransition>
      </Container>
    </>
  );
}

export default AccessNotification;
