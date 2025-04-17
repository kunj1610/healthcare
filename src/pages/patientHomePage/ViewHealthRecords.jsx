import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Empty, Modal } from "antd";
import PatientRecordCard from "../../components/PatientRecordCard";
import Cookies from "js-cookie";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export default function ViewHealthRecords(props) {
  const [visible, setVisible] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchPatientRecords();
  }, []);

  const fetchPatientRecords = async () => {
    try {
      const patientID = Cookies.get("userID");
      if (!patientID) {
        console.error("User ID is undefined");
        return;
      }

      const assignedPatientsRef = collection(db, "PatientRecords");
      const q = query(assignedPatientsRef, where("patientUid", "==", patientID));
      const querySnapshot = await getDocs(q);

      const records = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching patient records:", error);
    }
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record); 
    setVisible(true);
  };

  return (
    <>
      <Row style={{ padding: "40px 5px" }}>
        <Col>
          <h3 style={{ color: "gray" }}>View Health Records</h3>
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {patientRecords.length > 0 ? (
              patientRecords.map((record) => (
                <PatientRecordCard
                  key={record.id}
                  recordName={record.recordName}
                  date={record.date}
                  provider={record.provider}
                  viewButton={
                    <Button
                      type="primary"
                      onClick={() => handleViewRecord(record)}
                      style={{
                        backgroundColor: "#b3f4cb",
                        color: "#4caf50",
                        borderRadius: "20px",
                      }}
                    >
                      View
                    </Button>
                  }
                />
              ))
            ) : (
              <Empty />
            )}
          </div>
        </Col>
      </Row>

      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        {selectedRecord && (
          <Form style={{ padding: "20px" }}>
            <h1>Record Details</h1>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Patient Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={selectedRecord.patientName || "N/A"}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Record Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={selectedRecord.recordName || "N/A"}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Date
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={selectedRecord.date || "N/A"}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Patient Address
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={selectedRecord.patientUid || "N/A"}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Doctor's Address
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={selectedRecord.doctorID || "N/A"}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Doctor's Note
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder={selectedRecord.doctorNote || "No notes available"}
                  readOnly
                />
              </Col>
            </Form.Group>
          </Form>
        )}
      </Modal>
    </>
  );
}
