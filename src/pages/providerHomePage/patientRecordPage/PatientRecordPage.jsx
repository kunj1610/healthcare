import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import { Button } from "react-bootstrap";
import { message } from "antd";

import { Modal } from "antd";

import "../../../styles/patientRecordPage.css";
import CreateRecordForm from "../../../components/CreateRecordForm";

import { DatePicker } from "antd";
import moment from "moment";
import { Form } from "react-bootstrap";
import { getDocs, collection, doc, updateDoc, deleteDoc ,query,where} from "firebase/firestore";
import { db } from "../../../firebase";
import PatientInformation from "./PatientInformation";
import Cookies from 'js-cookie'; // Ensure you have imported Cookies

export default function PatientRecordPage(props) {
  console.log(props)
  const doctorID = Cookies.get("userID");
  const dateFormat = " DD/MM/YYYY";
  const [validated, setValidated] = useState(false);
  const [recordName, setRecordName] = useState("");
  const [doctorNote, setDoctorNote] = useState("");
  const [date, setDate] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);
  const [allPatientRecords, setAllPatientRecords] = useState([]);
  
  const fetchPatientRecords = async () => {
    try {
      // Ensure user ID exists
      const patientID = props.user?.uid;
      if (!patientID) {
        console.error("User ID is undefined");
        message.error("User ID is missing.");
        return;
      }
  
      const assignedPatientsRef = collection(db, "PatientRecords");
  
      // Query Firestore for patient records
      const q = query(assignedPatientsRef, where("patientUid", "==", patientID));
      const querySnapshot = await getDocs(q);
  
      // Extract records from Firestore
      const records = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      // Debugging: Log data
      console.log(records, "records");
  
      // Update state
      setPatientRecords(records);
      setAllPatientRecords(records);
  
      // Handle case when no records are found
      if (records.length === 0) {
        console.warn("No patient records found.");
        message.warning("No patient records available.");
      }
    } catch (error) {
      console.error("Error fetching patient records:", error);
      message.error("Failed to fetch patient records.");
    }
  };
  useEffect(() => {
    fetchPatientRecords();
  }, []);

  const [viewedRecord, setViewedRecord] = useState({
    recordName: "",
    doctorNote: "",
    date: "",
    id: "",
  });

  const searchRecordsByName = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredRecords = allPatientRecords.filter((record) =>
      `${record.recordName}`.toLowerCase().includes(value)
    );

    setPatientRecords(filteredRecords);
  };

  const handleUpdate = async (id) => {
    if (!recordName || !doctorNote || !date) {
      message.warning("All fields are required!");
      return;
    }

    try {
      const recordRef = doc(db, "PatientRecords", id);
      await updateDoc(recordRef, {
        recordName,
        doctorNote,
        date: date.toString(),
      });

      // Update local state
      setPatientRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === id ? { ...record, recordName, doctorNote, date: date.toString() } : record
        )
      );

      message.success("Record updated successfully!");
      setShowViewModal(false);
    } catch (error) {
      console.error("Error updating record:", error);
      message.error("Failed to update record.");
    }
  };

  // 🔹 Delete record from Firestore
  const handleDelete = async (id) => {
    try {
      const recordRef = doc(db, "PatientRecords", id);
      await deleteDoc(recordRef);

      // Update local state
      setPatientRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

      message.success("Record deleted successfully!");
      setShowViewModal(false);
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Failed to delete record.");
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleCreateRecord = () => {
    setShowCreateModal(true);
  };

  const handleViewRecord = (record) => {
    setRecordName(record.recordName);
    setDoctorNote(record.doctorNote);
    setDate(record.date);
    // alert(record.date);
    // alert(typeof record.date);

    setViewedRecord({});
    setViewedRecord(record);
    setShowViewModal(true);
  };

  return (
    <>
      <PatientInformation
        user={props.user}
        handleCreateBtn={handleCreateRecord}
        records={patientRecords}
        handleViewRecord={handleViewRecord}
        searchRecordsByName={searchRecordsByName}
      />

      <Modal
        visible={showCreateModal}
        onOk={() => setShowCreateModal(false)}
        onCancel={() => setShowCreateModal(false)}
        closable
        width={1000}
        footer={null}
      >
        <CreateRecordForm
          patientName={props.user.firstname + " " + props.user.lastname}
          patientAddress={props.user.address}
          patientUid={props.user.uid}
          provider="TODO: Manchester Hospital"
          doctorAddress="TODO: 0X13"
          setShowCreateModal={setShowCreateModal}
          setPatientRecords={setPatientRecords}
          patientRecords={patientRecords}
        />
      </Modal>
      <Modal
        visible={showViewModal}
        onOk={() => setShowViewModal(false)}
        onCancel={() => setShowViewModal(false)}
        closable
        width={1000}
        footer={null}
      >
        {/* <ViewRecordForm
          patientName={props.user.firstname + " " + props.user.lastname}
          patientAddress={props.user.address}
          provider="TODO: Manchester Hospital"
          doctorAddress="TODO: 0X13"
          recordName={viewedRecord.recordName}
          doctorNote={viewedRecord.doctorNote}
          date={new Date(viewedRecord.date)}
          setShowViewModal={setShowViewModal}
          setPatientRecords={setPatientRecords}
        /> */}

        <div style={{ fontSize: "18px", padding: "40px" }}>
          <Form noValidate validated={validated} onClick={handleSubmit}>
            <h1>Patient Record</h1>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Patient Name:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={props.user.firstname + " " + props.user.lastname}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Record Name:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="record name"
                  value={recordName}
                  onChange={(e) => setRecordName(e.target.value)}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Please enter a record name!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Date:</p>
              </Form.Label>
              <Col sm="4">
                <DatePicker
                  showTime
                
                  defaultValue={moment(new Date(date), dateFormat)}
                  value={moment(new Date(date), dateFormat)}
                  onChange={(date, dateString) =>
                    setDate(moment(new Date(dateString), dateFormat))
                  }
                />

                <Form.Control.Feedback type="invalid">
                  Please select a date for this note!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Patient Address:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={props.user?.uid}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Doctor's Address:</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder={doctorID} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <p>Doctor's Note</p>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={doctorNote}  
                  onChange={(e) => setDoctorNote(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide record note!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <div className="patient-create-record-btns-container">
              <Button
                variant="primary"
                type="button"
                className="patient-create-btn"
                onClick={() => handleUpdate(viewedRecord.id)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                type="button"
                className="patient-create-btn"
                onClick={() => handleDelete(viewedRecord.id)}
              >
                Delete
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
