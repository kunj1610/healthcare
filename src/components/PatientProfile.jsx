// Import necessary dependencies from React and other libraries
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Divider } from "antd";
import { BiUser } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import Cookies from "js-cookie";
import PatientImage from "../assets/images/patient-avatar.png";

// Component to display patient profile information
const PatientProfile = () => {
  // State to store patient data and loading status
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch patient data when component mounts
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Get userID from cookies
        const userID = Cookies.get("userID");
        if (!userID) {
          console.error("User not authenticated");
          return;
        }

        // Query Firestore for patient data
        const usersRef = collection(db, "User");
        const q = query(usersRef, where("uid", "==", userID), where("role", "==", "patient"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setPatientData(querySnapshot.docs[0].data());
        } else {
          console.error("Patient data not found!");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  // Define form fields with their labels, keys and icons
  const fields = [
    { label: "Full Name", key: "firstname", icon: <BiUser style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Last Name", key: "lastname", icon: <BiUser style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Email", key: "email", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Phone", key: "phone", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Gender", key: "gender", icon: <BiUser style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Age", key: "age", icon: <BiUser style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Address", key: "address", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "City", key: "city", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Zip Code", key: "zipCode", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Blood Type", key: "bloodType", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Allergy", key: "allergy", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
    { label: "Chronic Diseases", key: "chronicDiseases", icon: <FaRegAddressCard style={{ margin: "10px", fontSize: "22px" }} /> },
  ];

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading patient profile...</p>
      </Container>
    );
  }

  // Render patient profile form
  return (
    <Container>
      <Form>
        {/* Header section with profile title and role */}
        <Row>
          <Col>
            <p style={{ fontSize: "25px", fontWeight: "bold", margin: "10px 0", color: "gray" }}>Profile</p>
            <p style={{ color: "#16c79a" }}>Patient</p>
          </Col>
        </Row>
        {/* Avatar section with description */}
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={PatientImage} alt="patient avatar" />
            <Divider>Patient</Divider>
            <p style={{ padding: "20px", color: "gray" }}>
              Patient can view their medical records, grant access to doctors, share records with laboratories, and revoke access when needed.
            </p>
          </Col>
        </Row>
        {/* Patient information form fields */}
        <Row>
          <Col style={{ boxShadow: "#e2fad6 5px 5px 5px 5px", padding: "40px", backgroundColor: "#f7f7f7" }}>
            {fields.map((field) => (
              <Form.Group as={Row} className="mb-3" key={field.key}>
                <Form.Label column sm="3">
                  {field.label}
                </Form.Label>
                <Col sm="9" style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control type="text" value={patientData?.[field.key] || "N/A"} readOnly />
                  {field.icon}
                </Col>
              </Form.Group>
            ))}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

// Export the component
export default PatientProfile;
