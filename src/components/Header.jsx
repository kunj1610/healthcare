import React from "react";
import { FaEthereum } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "antd";
import Swal from "sweetalert2";
import "../styles/header.css";
import styled from "styled-components";
import auth from "../adapters/auth";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

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

const { Title } = Typography;

function Header() {
  let history = useHistory();

  function disconnect() {
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
        Cookies.remove("userID");
        auth.logout(() => {
          history.push("/");
        });
      }
    });
  }

  return (
    <header>
      <Container className="header-container">
        <Row>
          <Col>
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
            <DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;