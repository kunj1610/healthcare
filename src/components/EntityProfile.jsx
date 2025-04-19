// Import necessary dependencies
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
import { db } from "../firebase"; // Firebase config import
import DefaultImage from "../assets/images/entity-avatar.png";

// EntityProfile component for displaying laboratory profile information
const EntityProfile = () => {
  // State management for admin data and loading status
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch laboratory data when component mounts
  useEffect(() => {
    const fetchLabData = async () => {
      try {
        // Get user ID from cookies
        const userID = Cookies.get("userID");
        if (!userID) {
          message.error("User not authenticated");
          return;
        }

        // Query Firestore for user data
        const usersRef = collection(db, "User");
        const q = query(usersRef, where("uid", "==", userID));
        const querySnapshot = await getDocs(q);

        // Set admin data if found
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

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Show message if no data is available
  if (!adminData) {
    return <p className="text-center">No admin data available.</p>;
  }

  // Render profile information
  return (
    <Container>
      <Form>
        {/* Header section */}
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

        {/* Profile image and description */}
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

        {/* Profile details form */}
        <Row>
          <Col
            style={{
              boxShadow: "5px 5px 15px #e2fad6",
              padding: "40px",
              backgroundColor: "#f7f7f7",
            }}
          >
            {/* Fullname field */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Fullname
              </Form.Label>
              <Col sm="5" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.fullName || "N/A"} readOnly />
                <GrUserAdmin style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            {/* Association field */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Association
              </Form.Label>
              <Col sm="5" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.association || "N/A"} readOnly />
                <SiWorldhealthorganization style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            {/* Address field */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Address
              </Form.Label>
              <Col sm="10" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.address || "N/A"} readOnly />
                <FaRegAddressCard style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            {/* ID field */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                ID
              </Form.Label>
              <Col sm="3" style={{ display: "flex", alignItems: "center" }}>
                <Form.Control type="text" value={adminData.uid || "N/A"} readOnly />
                <MdPermIdentity style={{ marginLeft: "10px", fontSize: "22px" }} />
              </Col>
            </Form.Group>

            {/* Expiration field */}
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
