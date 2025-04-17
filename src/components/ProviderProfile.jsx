import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Divider } from "antd";
import { BiUser } from "react-icons/bi";
import { FaRegHospital } from "react-icons/fa";
import { FcOvertime } from "react-icons/fc";
import { IoIosCard } from "react-icons/io";
import { BiBookmarks } from "react-icons/bi";
import { HiOutlineMailOpen } from "react-icons/hi";
import ProviderImage from "../assets/images/provider-avatar.png";
import { db } from "../firebase"; // Import Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";

function ProviderProfile() {
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const userID = Cookies.get("userID");
        if (!userID) {
          console.error("User not authenticated");
          setLoading(false);
          return;
        }

        const usersRef = collection(db, "User");
        const q = query(usersRef, where("uid", "==", userID), where("role", "==", "doctor"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setProviderData(querySnapshot.docs[0].data());
        } else {
          console.error("Doctor data not found!");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <div>
              <p style={{ fontSize: "25px", fontWeight: "bold", color: "#57625f" }}>Profile</p>
              <p style={{ color: "#16c79a" }}>Doctor</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <img src={ProviderImage} alt="Doctor Avatar" />
            <Divider style={{ color: "#57625f" }}>Doctor</Divider>
            <p style={{ padding: "20px", color: "#57625f" }}>
              Doctor can perform CRUD operations on authorized patient records but has read-only access to others.
            </p>
          </Col>
        </Row>
        <Row>
          <Col style={{ boxShadow: "#e2fad6 5px 5px 5px 5px", padding: "40px", backgroundColor: "#f7f7f7" }}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Hospital</Form.Label>
              <Col sm="8" style={{ display: "flex" }}>
                <Form.Control type="text" value={providerData?.hospital || "N/A"} readOnly />
                <span><FaRegHospital style={{ margin: "10px", fontSize: "22px" }} /></span>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Full Name</Form.Label>
              <Col sm="8" style={{ display: "flex" }}>
                <Form.Control type="text" value={providerData?.fullname || "N/A"} readOnly />
                <span><BiUser style={{ margin: "10px", fontSize: "22px" }} /></span>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">ID</Form.Label>
              <Col sm="8" style={{ display: "flex" }}>
                <Form.Control type="text" value={providerData?.id || "N/A"} readOnly />
                <span><IoIosCard style={{ margin: "10px", fontSize: "22px" }} /></span>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Email</Form.Label>
              <Col sm="8" style={{ display: "flex" }}>
                <Form.Control type="text" value={providerData?.email || "N/A"} readOnly />
                <span><HiOutlineMailOpen style={{ margin: "10px", fontSize: "22px" }} /></span>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Expiration</Form.Label>
              <Col sm="8" style={{ display: "flex" }}>
                <Form.Control type="text" value={providerData?.expiration || "N/A"} readOnly />
                <span><FcOvertime style={{ margin: "10px", fontSize: "22px" }} /></span>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">position</Form.Label>
              <Col sm="8" style={{ display: "flex" }}>
                <Form.Control type="text" value={providerData?.position || "N/A"} readOnly />
                <span><BiBookmarks style={{ margin: "10px", fontSize: "22px" }} /></span>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ProviderProfile;
