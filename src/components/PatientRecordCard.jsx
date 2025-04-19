// Import necessary dependencies from React
import React from "react";

// Import required components from React-Bootstrap
import { Card, Button, Row, Col, Container } from "react-bootstrap";

// Import custom styles for the patient record card
import "../styles/patientRecordCard.css";

// PatientRecordCard component that displays individual patient record information
function PatientRecordCard(props) {
  return (
    // Main container for the record card
    <div className="record-card">
      {/* Display the name of the record */}
      <div className="record-name">{props.recordName}</div>
      {/* Display the date of the record */}
      <div className="record-date">{props.date}</div>
      {/* Container for the view record button */}
      <div className="view-record-btn">{props.viewButton}</div>
    </div>
  );
}

// Export the PatientRecordCard component for use in other parts of the application
export default PatientRecordCard;
