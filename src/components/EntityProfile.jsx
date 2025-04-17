import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Divider, message } from "antd";
import { GrUserAdmin } from "react-icons/gr";
import { FaRegAddressCard } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";
import { FcExpired } from "react-icons/fc";
import { SiWorldhealthorganization } from "react-icons/si";
import Cookies from "js-cookie";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this is your Firebase config import
import DefaultImage from "../assets/images/entity-avatar.png";

const EntityProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const userID = Cookies.get("userID");
        if (!userID) {
          message.error("User not authenticated");
          return;
        }

        const usersRef = collection(db, "User");
        const q = query(usersRef, where("uid", "==", userID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
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

    fetchLabData();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!adminData) {
    return <p className="text-center">No admin data available.</p>;
  }

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <div>
              <p style={{ fontSize: "25px", fontWeight: "bold", color: "#57625f" }}>
                Profile
              </p>
              <p style={{ color: "#16c79a" }}>Laboratory</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <img
              src={adminData.image || DefaultImage}
              alt="Admin Avatar"
              style={{ width: "120px", borderRadius: "50%" }}
            />
            <Divider>Lab</Divider>
            <p style={{ color: "#57625f" }}>
              View records that are shared by patients.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              boxShadow: "5px 5px 15px #e2fad6",
              padding: "40px",
              backgroundColor: "#f7f7f7",
            }}
          >
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Fullname
              </Form.Label>
              <Col sm="5" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.fullName || "N/A"} readOnly />
                <GrUserAdmin style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Association
              </Form.Label>
              <Col sm="5" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.association || "N/A"} readOnly />
                <SiWorldhealthorganization style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Address
              </Form.Label>
              <Col sm="10" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.address || "N/A"} readOnly />
                <FaRegAddressCard style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                ID
              </Form.Label>
              <Col sm="3" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.uid || "N/A"} readOnly />
                <MdPermIdentity style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Expiration
              </Form.Label>
              <Col sm="3" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.expiration || "N/A"} readOnly />
                <FcExpired style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EntityProfile;
