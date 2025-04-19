// Import necessary dependencies from React and other libraries
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "antd";
import Swal from "sweetalert2"; // For showing alert dialogs
import "../styles/header.css";
import styled from "styled-components";
import auth from "../adapters/auth"; // Authentication adapter
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie"; // For handling cookies

// Styled component for the logout button
const DisconnectBtn = styled.button`
  width: 120px;
  background-color: #16c79a;
  border-radius: 30px;
  border: 1px solid lightgray;
  font-size: 18px;
  color: white;
  position: absolute;
  right: 130px;
  :hover {
    background-color: #13a57c;
    cursor: pointer;
    border-radius: 20px;
  }
`;

// Destructure Title component from Typography
const { Title } = Typography;

// Header component that displays the app logo and logout button
function Header() {
  // Get history object for navigation
  let history = useHistory();

  // Function to handle user logout
  function disconnect() {
    // Show confirmation dialog before logging out
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16c79a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove user ID cookie
        Cookies.remove("userID");
        // Call logout function from auth adapter
        auth.logout(() => {
          history.push("/"); // Redirect to home page
        });
      }
    });
  }

  return (
    <header>
      <Container className="header-container">
        <Row>
          <Col>
            {/* Logo and app name container */}
            <div className="header-appname">
              <span>
                <img
                  src="/Logo.png"
                  alt="Logo"
                  style={{ position: "relative", width: "30px", height: "40px", marginBottom: "5px" }}
                />
              </span>
              <Title level={4} style={{ color: "#16c79a", fontSize: "20px", textAlign: "center", marginTop: "5px" }}>
                HealtCARE
              </Title>
            </div>
          </Col>
          <Col>
            {/* Logout button */}
            <DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

// Export the Header component
export default Header;