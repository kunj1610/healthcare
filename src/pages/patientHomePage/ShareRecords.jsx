import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { notification, Select } from "antd";
import Cookies from "js-cookie";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ShareRecords() {
  const [validated, setValidated] = useState(false);
  const [userID, setUserID] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientList, setRecipientList] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState("");

  useEffect(() => {
    const userIdFromCookies = Cookies.get("userID");
    console.log("User ID from cookies", userIdFromCookies);
    if (userIdFromCookies) {
      setUserID(userIdFromCookies);
      setPatientAddress(userIdFromCookies);
      fetchRecipients();
      fetchRecords(userIdFromCookies);
    }
  }, []);

  const fetchRecipients = async () => {
    try {
      const q = query(collection(db, "User"), where("role", "==", "Labs"));
      const querySnapshot = await getDocs(q);
      const recipients = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Recipients:", recipients);
      setRecipientList(recipients);
    } catch (error) {
      console.error("Error fetching recipients:", error);
      notification.error({ message: "Failed to load recipients." });
    }
  };

  const fetchRecords = async (userId) => {
    try {
      const q = query(
        collection(db, "PatientRecords"),
        where("patientUid", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Records:", records);
      setRecordList(records);
    } catch (error) {
      console.error("Error fetching patient records:", error);
      notification.error({ message: "Failed to load records." });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    if (!patientAddress || !recipientAddress || !selectedRecord) {
      notification.error({ message: "All fields are required!" });
      return;
    }

    try {
      await addDoc(collection(db, "LabsRecord"), {
        patientId: patientAddress,
        labId: recipientAddress,
        recordName: selectedRecord,
        timestamp: new Date(),
      });
      notification.success({ message: "Record shared successfully!" });
    } catch (error) {
      console.error("Error sharing record:", error);
      notification.error({ message: "Failed to share record." });
    }
  };

  return (
    <Row
      style={{
        padding: "90px",
        boxShadow: "#e2fad6 5px 5px 5px 5px",
        backgroundColor: "#fafafa",
      }}
    >
      <h3>Share Records</h3>
      <Col sm={1}></Col>
      <Col>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="yourEthereumAddress">
              <Form.Label><b>Your ID:</b></Form.Label>
              <Form.Control type="text" value={patientAddress} readOnly />
            </Form.Group>
          </Row>

          <Row className="mb-3">

  <Col md={6}>
    <Form.Group controlId="recipientEthereumAddress">
      <Form.Label className="fw-bold">Recipient Name</Form.Label>
      <Form.Control
        as="select"
        required
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        className="form-select"
      >
        <option value="">Select Recipient</option>
        {recipientList.length > 0 ? (
          recipientList
            .filter((recipient) => recipient.id) // Ensure valid ID
            .map((recipient) => (
              <option key={recipient.id} value={recipient.uid}>
                {recipient.fullName || "No Name Available"}
              </option>
            ))
        ) : (
          <option disabled>No recipients found</option>
        )}
      </Form.Control>
    </Form.Group>
  </Col>

  {/* Record Selection */}
  <Col md={6}>
    <Form.Group controlId="recordName">
      <Form.Label className="fw-bold">Record Name</Form.Label>
      <Form.Control
        as="select"
        required
        value={selectedRecord}
        onChange={(e) => setSelectedRecord(e.target.value)}
        className="form-select"
      >
        <option value="">Select Record</option>
        {recordList.length > 0 ? (
          recordList
            .filter((record) => record.id && record.recordName) // Ensure valid ID and name
            .map((record) => (
              <option key={record.id} value={record.recordName}>
                {record.recordName || "Unnamed Record"}
              </option>
            ))
        ) : (
          <option disabled>No records found</option>
        )}
      </Form.Control>
    </Form.Group>
  </Col>
</Row>


          <Row>
            <Col sm={3}>
              <Button variant="primary" type="submit">
                Share
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col sm={1}></Col>
    </Row>
  );
}