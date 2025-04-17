import React, { useState } from "react";
import { DatePicker, message } from "antd";
import moment from "moment";
import { Button, Form, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateRecordForm(props) {
  const doctorID = Cookies.get("userID");
  const dateFormat = "DD/MM/YYYY";

  const [validated, setValidated] = useState(false);
  const [recordName, setRecordName] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleSave = async () => {
    if (!recordName || !date || !doctorNote) {
      message.error("Please fill in all fields before saving.");
      return;
    }
    try {
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

  const handleCancel = () => {
    props.setShowCreateModal(false);
  };

  return (
    <div style={{ fontSize: "18px", padding: "40px" }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 style={{ color: "#57625f" }}>Patient Record</h1>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Patient Name:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={props.patientName} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Record Name:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={recordName} onChange={(e) => setRecordName(e.target.value)} required />
            <Form.Control.Feedback type="invalid">Please enter a record name!</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Date:</Form.Label>
          <Col sm="4">
            <DatePicker showTime onChange={(date) => setDate(date)} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Patient Address:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={props.patientUid} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Doctor's Address:</Form.Label>
          <Col sm="9">
            <Form.Control type="text" value={doctorID} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Doctor's Note</Form.Label>
          <Col sm="9">
            <Form.Control as="textarea" rows={5} value={doctorNote} onChange={(e) => setDoctorNote(e.target.value)} required />
            <Form.Control.Feedback type="invalid">Please provide a note!</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div className="patient-create-record-btns-container">
          <Button variant="primary" type="button" onClick={handleSave}>Save</Button>
          <Button variant="danger" type="button" onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
}
