import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Modal from "../../components/Modal";
import { DatePicker, message } from "antd";
import "../../styles/issueDoctorID.css";
import QRCode from "react-qr-code";
import Web3 from "web3";
import DoctorRegistration from "../../contracts/DoctorRegistry.json";
import { openNotification } from "../../helpers/trinsicExchangeNotification";
import { db, collection, addDoc,  } from "../../firebase"; 
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { useHistory } from "react-router-dom";

const key = "updatable";

function IssueDoctorCredentials() {
  const history = useHistory();
  const [hospital, setHospital] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setID] = useState("");
  const [expiration, setExpiration] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrValue, setQRvalue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const auth = getAuth();
  function issueLoading() {
    message.loading({ content: "Loading...", key });
  }

  useEffect(() => {
    if (showQR && showModal) {
      message.success({ content: "Loaded!", key, duration: 2 });
    }
  }, [showQR, showModal]);


  async function issueID() {
    try {
      if (hospital && fullname && address && position && department && id && expiration && email && password) {
        issueLoading();
  
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store extra details in Firestore
        const formData = {
          hospital,
          fullname,
          address,
          position,
          department,
          id,
          expiration,
          role: "doctor",
          email,
          uid: user.uid,
          timestamp: new Date(),
        };
        await addDoc(collection(db, "User"), formData);
  
        // Connect to Blockchain
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const accounts = await web3.eth.getAccounts();
        const doctorAddress = accounts[0]; // Use the first account for the doctor
  
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = DoctorRegistration.networks[networkId];
        const contract = new web3.eth.Contract(
          DoctorRegistration.abi,
          deployedNetwork && deployedNetwork.address
        );
  
        // Call smart contract function
        await contract.methods
          .registerDoctor(
            doctorAddress, 
            fullname,
            hospital,
            address,
            position,
            department,
            id,
            email
          )
          .send({ from: accounts[0] });
  
        message.success("Doctor registered on blockchain successfully!");
  
      } else {
        message.warning("Please fill in all fields!");
      }
    } catch (err) {
      console.error("Error saving data to Firestore or Blockchain:", err);
      openNotification();
    }
  }
  


  return (
    <>
      <Container>
        <Row md={4}>
          <Col></Col>
          <Col
            xs={6}
            style={{
              margin: "0 auto 50px auto",
              padding: "20px",
              width: "90%",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
          >
            <Form>
              <h1>Doctor Registration Form</h1>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Password</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Hospital</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Manchester Hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Full Name</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Address</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Oxford Rd, Manchester M21 3RN"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Position</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Consultant"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Department</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Orthopaedics"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Medical ID</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Your ID e.g., 1231451"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Expiration</Form.Label>
                <Col sm="3">
                  <DatePicker onChange={(data, dataString) => setExpiration(dataString)} />
                </Col>
              </Form.Group>

              <Button 
                variant="primary"
                size="sm"
                style={{ borderRadius: "12px", padding: "10px", fontSize: "18px", marginRight: "10px" }}
                onClick={issueID}
              >
                Register
              </Button>

              <Button
                variant="primary"
                size="sm"
                style={{ borderRadius: "12px", padding: "10px", fontSize: "18px" }}
                onClick={() => history.push("/")}
              >
                Back Home
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>

        {showQR && showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <Container>
              <h4>Scan this code to accept a connectionless credential</h4>
              <Row style={{ margin: "40px" }}>
                <Col></Col>
                <Col>
                  <div style={{ padding: "20px" }}>
                    <QRCode value={qrValue} />
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </Modal>
        )}
      </Container>
    </>
  );
}

export default IssueDoctorCredentials;
