import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Divider, message } from "antd";
import { TiUser } from "react-icons/ti";
import { FaRegAddressCard } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";
import { FcExpired } from "react-icons/fc";
import {collection,query,where ,getDocs } from "firebase/firestore";
import Cookies from "js-cookie";

import { db } from "../firebase"; // Ensure your Firebase configuration is imported
import AdminImage from "../assets/images/admin-avatar.png";

function AdminProfile() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      // Retrieve the UID stored in cookies
      const userID = Cookies.get("userID"); 
      console.log("userID from Cookies:", userID);
      
      if (!userID) {
        message.error("User not authenticated");
        return;
      }
  
      // Query Firestore for user with the given UID
      const usersRef = collection(db, "User");
      const q = query(usersRef, where("uid", "==", userID)); // Query Firestore where uid matches userID
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log("Fetched Admin Data:", userData);
        setAdminData(userData);
      } else {
        message.error("Admin data not found!");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      message.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAdminData();
  }, []);
  

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" />
        <p>Loading profile...</p>
      </Container>
    );
  }

  if (!adminData) return null;

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <div>
              <p style={{ fontSize: "25px", fontWeight: "bold", margin: "10px 0 0 0", color: "#57625f" }}>
                Profile
              </p>
              <p style={{ color: "#16c79a" }}>Admin</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={AdminImage} alt="admin avatar" />
            <Divider style={{ color: "#57625f" }}>Admin</Divider>
            <p style={{ padding: "20px", color: "#57625f" }}>
              System Admin can assign patients to doctors, view doctors and unassign assigned patients if necessary.
            </p>
          </Col>
        </Row>
        <Row>
          <Col style={{ boxShadow: "#e2fad6 5px 5px 5px 5px", padding: "40px" }}>
            <div>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Fullname</Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control type="text" value={adminData.fullName} readOnly />
                  <span>
                    <TiUser style={{ margin: "10px", fontSize: "22px" }} />
                  </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Address</Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control as="textarea" value={adminData.address} readOnly />
                  <span>
                    <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} />
                  </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">ID</Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control type="text" value={adminData.uid} readOnly />
                  <span>
                    <MdPermIdentity style={{ margin: "10px", fontSize: "22px" }} />
                  </span>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Expiration</Form.Label>
                <Col sm="6" style={{ display: "flex" }}>
                  <Form.Control type="text" value={adminData.expiration} readOnly />
                  <span>
                    <FcExpired style={{ margin: "10px", fontSize: "22px" }} />
                  </span>
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AdminProfile;
