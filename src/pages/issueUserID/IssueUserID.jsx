import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Button, message, Card } from "antd";
import { GiDoctorFace } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import IssueDoctorCredentials from "./IssueDoctorCredentials";
import IssueEntityCredentials from "./IssueEntityCredentials";

import "../../styles/issueDoctorID.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const { TabPane } = Tabs;

function IssueUserID() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleDone = () => {
    setLoading(true);
    message.success("Processing complete!").then(() => {
      message.loading("Returning home...", 1.5).then(() => {
        setLoading(false);
        history.push("/");
      });
    });
  };

  return (
    <>
    <Navbar />
    <div style={{ marginTop: "80px" }}> 
      <MainContainer>
        <Container style={{ marginTop: "30px" }}> 
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card
                title="User ID Issuance"
                bordered={false}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  padding: "20px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Tabs tabPosition="top" animated>
                  <TabPane
                    tab={
                      <span>
                        <GiDoctorFace style={{ fontSize: "18px", color: "#16c79a" }} /> Doctors Registration
                      </span>
                    }
                    key="1"
                  >
                    <IssueDoctorCredentials />
                  </TabPane>

                  <TabPane
                    tab={
                      <span>
                        <GrUserAdmin style={{ fontSize: "18px", color: "#ff6600" }} /> Labs Registration
                      </span>
                    }
                    key="2"
                  >
                    <IssueEntityCredentials />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Container>
      </MainContainer>
      
    </div>
  
  </>
  );
}

export default IssueUserID;
