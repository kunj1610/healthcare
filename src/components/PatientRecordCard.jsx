import React from "react";

import { Card, Button, Row, Col, Container } from "react-bootstrap";

import "../styles/patientRecordCard.css";

function PatientRecordCard(props) {
  return (
    <div className="record-card">
      <div className="record-name">{props.recordName}</div>
      <div className="record-date">{props.date}</div>
      <div className="view-record-btn">{props.viewButton}</div>
    </div>
  );
}

export default PatientRecordCard;
