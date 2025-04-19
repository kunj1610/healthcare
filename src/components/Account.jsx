// Import necessary React hooks and components
import React, { useEffect, useState } from "react";

// Import Bootstrap layout components
import { Container, Row, Col } from "react-bootstrap";

// Import ethers library for Ethereum interaction
import { ethers } from "ethers";

// Import styled-components for custom styling
import styled from "styled-components";

// Import authentication utilities and routing
import auth from "../adapters/auth";
import { useHistory } from "react-router-dom";

// Import Blockies for Ethereum address visualization
import Blockies from "react-blockies";

// Import Ant Design icons and components
import { CopyOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Paragraph } = Typography;

// Styled component for the logout button
const DisconnectBtn = styled.button`
  width: 120px;
  background-color:#16c79a;
  border-radius: 30px;
  margin-top: 10px;
  border: 1px solid lightgray;
  font-size: 18px;
  color: white;
  :hover {
    background-color:#16c79a;
    cursor: pointer;
    border-radius: 20px;
  }
`;

// Account component for displaying user's Ethereum account information
function Account(props) {
  // Initialize routing history
  let history = useHistory();
  
  // State variables for user account data
  const [userAddress, setUserAddress] = useState("");
  const [connectedToNet, setConnectedToNet] = useState("");
  const [userBalance, setUserBalance] = useState("");

  // Function to fetch and set user's Ethereum account data
  async function getUserData() {
    if (
      typeof window.ethereum !== "undefined" ||
      typeof window.web3 !== "undefined"
    ) {
      // Initialize Web3 provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Request account access
      await provider.send("eth_requestAccounts", []);

      // Determine connected network based on chainId
      switch (window.ethereum.chainId) {
        case "0x1":
          setConnectedToNet("Ethereum Main Network");
          break;
        case "0x3":
          setConnectedToNet("Ropsten Test Network");
          break;
        case "0x4":
          setConnectedToNet("Rinkeby Test Network");
          break;
        case "0x5":
          setConnectedToNet("Goerli Test Network");
          break;
        case "0x2a":
          setConnectedToNet("Kovan Test Network");
          break;
        case "0x539":
          setConnectedToNet("Localhost Local Network");
          break;
        default:
          break;
      }

      // Set user's address and balance
      setUserAddress(await signer.getAddress());
      setUserBalance(ethers.utils.formatEther(await signer.getBalance()));
    }
  }

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, []);

  // Function to handle user logout
  function disconnect() {
    auth.logout(() => {
      history.push("/");
    });
  }

  // Render account information
  return (
    <>
    {/* Main container for account information */}
    <Container
      style={{
        margin: "20px auto 20px auto",
        padding: "20px",
        boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        backgroundColor: "rgb(97 195 170 / 29%)",
        borderRadius: "22px",
      }}
    >
      <Row>
        <Col>
          {/* Network connection status */}
          <p
            style={{
              fontSize: "20px",
              display: "flex",
              flexFlow: "column nowrap",
              color: "gray",
            }}
          >
            Connected to{" "}
            <span style={{ fontWeight: "bold" }}>{connectedToNet}</span>
          </p>
          <Row>
            <Col>{props.status}</Col>
          </Row>
        </Col>
        <Col>
          <Row>
            {/* User address blockies and display */}
            <Col style={{ textAlign: "right" }}>
              <Blockies seed={userAddress} size={5} scale={8} />
            </Col>
            <Col>
              {" "}
              <Paragraph
                copyable={{
                  text: userAddress,
                  icon: (
                    <CopyOutlined style={{  color:"#16c79a" }}/>
                  ),
                }}
                style={{ fontSize: "20px", color:"grey"}}
              >
                {/* Display truncated address */}
                {`${userAddress.substring(0, 9)}...${userAddress.substring(
                  33,
                  42
                )}`}
              </Paragraph>
            </Col>
          </Row>
          <Row>
            {/* Balance and logout button */}
            <Col>
              <p
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  fontSize: "20px",
                  color: "grey",
                }}
              >
                {" "}
                ${userBalance}
              </p>
            </Col>
            <Col>
              <DisconnectBtn onClick={disconnect}>Logout</DisconnectBtn>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default Account;
