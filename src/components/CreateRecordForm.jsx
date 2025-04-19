// Import required dependencies
import React, { useState } from "react";
import { DatePicker, message } from "antd"; // Ant Design components for UI
import moment from "moment"; // Date/time manipulation library
import { Button, Form, Row, Col } from "react-bootstrap"; // Bootstrap components
import Cookies from "js-cookie"; // Cookie management
import { db } from "../firebase"; // Firebase database instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

// Component for creating new patient records
export default function CreateRecordForm(props) {
  // Get doctor ID from cookies
  const doctorID = Cookies.get("userID");
  const dateFormat = "DD/MM/YYYY";

  // State management for form fields
  const [validated, setValidated] = useState(false);
  const [recordName, setRecordName] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [date, setDate] = useState(null);

  // Handle form submission and validation
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Save record to Firebase
  const handleSave = async () => {
    // Validate required fields
    if (!recordName || !date || !doctorNote) {
      message.error("Please fill in all fields before saving.");
      return;
    }
    try {
      // Create new record object
      let newRecord = {
        recordName,
        date: date.toDate().toISOString(),
        doctorNote,
        patientUid: props.patientUid,
        patientName: props.patientName,
        doctorID,
        createdAt: new Date().toISOString(),
      };

      // Store record in Firebase
      await addDoc(collection(db, "PatientRecords"), newRecord);
      message.success("New record added successfully");
      props.setPatientRecords((prevState) => [...prevState, newRecord]);
      props.setShowCreateModal(false);
    } catch (error) {
      console.error("Error saving record:", error);
      message.error("Failed to save record. Try again.");
    }
  };

  // Handle modal cancellation
  const handleCancel = () => {
    props.setShowCreateModal(false);
  };

  // Render form UI
  return (
    <div style={{ fontSize: "18px", padding: "40px" }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 style={{ color: "#57625f" }}>Patient Record</h1>
        {/* Patient Name Field - Read Only */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Patient Name:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={props.patientName} readOnly />
          </Col>
        </Form.Group>

        {/* Record Name Field */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Record Name:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={recordName} onChange={(e) => setRecordName(e.target.value)} required />
            <Form.Control.Feedback type="invalid">Please enter a record name!</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Date Picker Field */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Date:</Form.Label>
          <Col sm="4">
            <DatePicker showTime onChange={(date) => setDate(date)} required />
          </Col>
        </Form.Group>

        {/* Patient Address Field - Read Only */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Patient Address:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={props.patientUid} readOnly />
          </Col>
        </Form.Group>

        {/* Doctor Address Field - Read Only */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Doctor's Address:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={doctorID} readOnly />
          </Col>
        </Form.Group>

        {/* Doctor's Note Field */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Doctor's Note</Form.Label>
          <Col sm="9">
            <Form.Control as="textarea" rows={5} value={doctorNote} onChange={(e) => setDoctorNote(e.target.value)} required />
            <Form.Control.Feedback type="invalid">Please provide a note!</Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Action Buttons */}
        <div className="patient-create-record-btns-container">
          <Button variant="primary" type="button" onClick={handleSave}>Save</Button>
          <Button variant="danger" type="button" onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
}
