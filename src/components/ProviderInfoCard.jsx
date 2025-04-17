import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ethers } from "ethers";
import Blockies from "react-blockies";
import { CgShutterstock } from "react-icons/cg";
import { FcPlus } from "react-icons/fc";
import { CopyOutlined } from "@ant-design/icons";
import { Typography, Divider, Drawer, message, Spin } from "antd";
import { db } from "../firebase";
import Cookies from "js-cookie";
import InfiniteScroll from "react-infinite-scroller";
import "../styles/providerInfoCard.css";
import { query, where, getDocs, addDoc, doc, deleteDoc, collection } from "firebase/firestore";

const { Paragraph } = Typography;

function AssignedPatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedPatients = async () => {
      try {
        const userID = Cookies.get("userID");
        const usersRef = collection(db, "User");
        const q = query(usersRef, where("role", "==", "patient"));
        const querySnapshot = await getDocs(q);
        const patientsData = querySnapshot.docs.map((doc) => doc.data());
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching assigned patients:", error);
        message.error("Failed to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPatients();
  }, []);

  const unassignPatient = async (id) => {
    try {
      await deleteDoc(doc(db, "AssignedPatients", id));
      setPatients(patients.filter((p) => p.id !== id));
      message.success("Patient unassigned successfully");
    } catch (error) {
      console.error("Error unassigning patient:", error);
      message.error("Failed to unassign patient.");
    }
  };

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll initialLoad={false} pageStart={0} hasMore={!loading} useWindow={false}>
        {loading ? (
          <Spin size="large" />
        ) : (
          patients.map((patient) => (
            <div
              key={patient.id}
              style={{ display: "flex", justifyContent: "space-evenly", padding: "10px 0" }}
            >
              <Blockies seed={patient.uid} size={5} scale={8} />
              <span>{patient.uid}</span>
              <Button danger icon={<CgShutterstock />} onClick={() => unassignPatient(patient.uid)}>
                Unassign
              </Button>
            </div>
          ))
        )}
      </InfiniteScroll>
      <Divider />
    </div>
  );
}

function AssignPatientsDrawer({ uid }) {
  const [visible, setVisible] = useState(false);
  const [patientID, setPatientID] = useState("");

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const assignPatient = async () => {
    if (!patientID.trim()) {
      message.error("Patient ID cannot be empty");
      return;
    }

    try {
      const assignedPatientsRef = collection(db, "AssignedPatients");
      await addDoc(assignedPatientsRef, {
        doctorID: uid,
        patientID: patientID,
        status: "pending",
        timestamp: new Date().toISOString(),
      });

      message.success("Patient assigned successfully");
      setPatientID("");
    } catch (error) {
      console.error("Error assigning patient:", error);
      message.error("Failed to assign patient.");
    }
  };


  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<FcPlus />}>Assign Patients</Button>
      <Drawer title={<h3>Assign Patient</h3>} onClose={onClose} visible={visible} width={720}>
        <Form>
          <Row>
            <Col style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px", padding: "40px" }}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Doctor ID</Form.Label>
                <Col sm="9">
                  <Form.Control type="text" value={uid} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Patient ID</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    value={patientID}
                    onChange={(e) => setPatientID(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button type="primary" onClick={assignPatient}>Assign</Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <h3>Assigned Patients</h3>
        <AssignedPatientsList doctorID={uid} />
      </Drawer>
    </>
  );
}
export default function ProviderInfoCard({ uid, image, name }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      if (window.ethereum || window.web3) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setAddress(await signer.getAddress());
      }
    };
    getUserData();
  }, []);

  return (
    <div className="provider-card-container">
      <Row>
        <Col>
          <Blockies seed={address} size={8} scale={3} />
        </Col>
        <Col sm={8}>
          <Paragraph copyable={{ text: address, icon: <CopyOutlined /> }} style={{ fontSize: "12px" }}>
            {uid}
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="provider-card-image">{image}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="provider-name-dep">
            <p>{name}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ margin: "20px" }}>
          <AssignPatientsDrawer uid={uid} />
        </Col>
      </Row>
    </div>
  );
}
