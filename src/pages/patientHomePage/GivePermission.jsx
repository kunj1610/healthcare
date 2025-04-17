import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from "firebase/firestore";
import Cookies from "js-cookie";
import { Button, Container, Alert, Form } from "react-bootstrap";
import { notification } from "antd";
import { CSSTransition } from "react-transition-group";

import "../../styles/accessNotification.css"; // Ensure this CSS file exists

const openNotification = (message, placement) => {
  notification.info({
    message: `Notification`,
    description: message,
    placement,
  });
};

export default function GivePermission() {
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const patientID = Cookies.get("userID");

  useEffect(() => {
    if (patientID) {
      fetchAssignedPatients();
    }
  }, [patientID]);

  const fetchAssignedPatients = async () => {
    try {
      const q = query(
        collection(db, "AssignedPatients"),
        where("patientID", "==", patientID),
        orderBy("timestamp", "desc") // Sort by timestamp (latest first)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAssignedPatients(data);
    } catch (error) {
      console.error("Error fetching records: ", error);
      notification.error({ message: "Failed to load patient records." });
    }
  };

  const handleAccept = async (id) => {
    const confirmAction = window.confirm("Are you sure you want to accept this request?");
    if (!confirmAction) return;
  
    try {
      const patientRef = doc(db, "AssignedPatients", id);
      await updateDoc(patientRef, { status: "allowed" });
      openNotification("Access granted!", "bottomRight");
      fetchAssignedPatients(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
      notification.error({ message: "Failed to update status." });
    }
  };
  
  const handleDeny = async (id) => {
    const confirmAction = window.confirm("Are you sure you want to deny this request?");
    if (!confirmAction) return;
  
    try {
      const patientRef = doc(db, "AssignedPatients", id);
      await updateDoc(patientRef, { status: "denied" });
      openNotification("Access denied!", "bottomRight");
      fetchAssignedPatients(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
      notification.error({ message: "Failed to update status." });
    }
  };
  

  return (
    <Container style={{ paddingTop: "1rem", maxHeight: "600px", overflowY: "auto" }}>
      <h3>Assigned Patients</h3>
      {assignedPatients.length === 0 ? (
        <p>No records found.</p>
      ) : (
        assignedPatients.map((patient) => (
          <CSSTransition key={patient.id} in={showMessage} timeout={300} classNames="alert" unmountOnExit>
            <Alert
              style={{
                boxShadow: "#e2fad6 5px 5px 5px 5px",
                backgroundColor: "#fafafa",
                marginBottom: "20px",
              }}
              variant="light"
            >
              <Alert.Heading>Access Request</Alert.Heading>
              <p style={{ float: "right" }}>
                <strong>Doctor ID:</strong> {patient.doctorID}
              </p>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Patient ID</strong>
                </Form.Label>
                <Form.Control type="text" value={patientID} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Status</strong>
                </Form.Label>
                <Form.Control type="text" value={patient.status} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Assigned On</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={patient.timestamp ? new Date(patient.timestamp).toLocaleString() : "N/A"}
                  readOnly
                />
              </Form.Group>
              {patient && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button style={{ margin: "5px" }} onClick={() => handleAccept(patient.id)} variant="primary">
                    Accept
                  </Button>
                  <Button style={{ margin: "5px" }} onClick={() => handleDeny(patient.id)} variant="danger">
                    Deny
                  </Button>
                </div>
              )} 
            </Alert>
          </CSSTransition>
        ))
      )}
    </Container>
  );
}