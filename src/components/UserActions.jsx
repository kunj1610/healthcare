// Import necessary dependencies from React and React-Bootstrap
import React from "react";

// Import React Router hook for navigation
import { useHistory } from "react-router";

// Import Bootstrap components for layout and buttons
import { Button, Row, Col } from "react-bootstrap";

// UserActions component that displays a list of action buttons
export default function UserActions(props) {
  // Initialize history object for navigation
  let history = useHistory();

  // Handle button click by navigating to the corresponding route
  function handleClick(e) {
    // Construct route by combining userHome prop with button text (spaces removed)
    history.push(`${props.userHome}${e.target.innerHTML.replace(/\s/g, "")}`);
  }

  return (
    <>
      {/* Map through actions array to create buttons */}
      {props.actions.map((action, index) => (
        <Row className="action-items" key={index}>
          <Col>
            <Button
              style={{ width: "100%", textAlign: "left",color:"#fafafa", }}
              size="lg"
              onClick={handleClick}
              variant="outline-success"
            >
              {action.name}
            </Button>
          </Col>
        </Row>
      ))}
    </>
  );
}
