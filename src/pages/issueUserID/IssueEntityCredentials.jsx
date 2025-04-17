import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { DatePicker, message } from "antd";
import Modal from "../../components/Modal";
import QRCode from "react-qr-code";
import { openNotification } from "../../helpers/trinsicExchangeNotification";
import { db, collection, addDoc } from "../../firebase";
import Web3 from "web3";
import LabRegistry from "../../contracts/LabRegistry.json";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
const key = "updatable";

function IssueEntityCredentials(props) {
    const history = useHistory();
  const [fullname, setFullname] = useState("");
  const [association, setAssociation] = useState("");
  const [address, setAddress] = useState("");
  const [id, setID] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [expiration, setExpiration] = useState("");
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
      if (
        fullname !== "" &&
        association !== "" &&
        id !== "" &&
        department !== "" &&
        expiration !== "" &&
        email !== "" &&
        password !== ""
      ) {
        issueLoading();
  
        // Register user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        let formData = {
          fullName: fullname,
          association,
          medicalID: id,
          department,
          expiration,
          role: "Labs",
          email,
          uid: user.uid,
          timestamp: new Date(),
        };
  
        await addDoc(collection(db, "User"), formData);
        message.success("Registration saved successfully!");
  
        // Connect to Blockchain
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = LabRegistry.networks[networkId];
  
        if (!deployedNetwork) {
          throw new Error("Smart contract not deployed on the selected network.");
        }
  
        const contract = new web3.eth.Contract(LabRegistry.abi, deployedNetwork.address);
  
        // Call smart contract function (ONLY blockchain-required data)
        await contract.methods
          .registerLab(email, fullname, association, id, department)
          .send({ from: accounts[0] });
  
        message.success("Lab registered on blockchain successfully!");
      } else {
        message.warning("Please fill in all fields!");
      }
    } catch (err) {
      console.error("Error saving to Firestore or Blockchain:", err);
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
              <h1>Labs Registration Form</h1>
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
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Full Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="your name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Association
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="MIT University"
                    value={association}
                    onChange={(e) => setAssociation(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Address
                </Form.Label>
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
                <Form.Label column sm="2">
                 Medical ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="your id e.g., 1231451"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                </Col>
              </Form.Group>


              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Deparment
                </Form.Label>
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
                <Form.Label column sm="2">
                  Expiration
                </Form.Label>
                <Col sm="2">
                  <DatePicker
                    type="text"
                    onChange={(data, dataString) => setExpiration(dataString)}
                  />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  fontSize: "18px",
                  
                }}
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
                  {" "}
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
export default IssueEntityCredentials;
