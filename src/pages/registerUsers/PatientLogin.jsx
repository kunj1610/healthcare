import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db, collection, getDocs, query, where } from "../../firebase";
import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import GoBackBtn from "../../components/GoBackBtn";
import Cookies from "js-cookie";
import Web3 from "web3";

const { Title } = Typography;

const PatientLogin = () => {
  let history = useHistory();
  const auth = getAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      Cookies.set("userID", user.uid, { expires: 7, secure: true, sameSite: "Strict" });
  
      const usersRef = collection(db, "User");
      const q = query(usersRef, where("email", "==", values.email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        message.error("User not found.");
        setLoading(false);
        return;
      }
  
      const userData = querySnapshot.docs[0].data();
      const roleRedirects = {
        patient: "/home/patientHome",
        doctor: "/home/ProviderHome",
        Labs: "/home/entityHome",
        admin: "/home/adminHome",
      };
  
      if (!(userData.role in roleRedirects)) {
        message.error("Access denied. Invalid role.");
        setLoading(false);
        return;
      }

      if (!window.ethereum) {
        message.error("MetaMask is not installed!");
        setLoading(false);
        return;
      }
  
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
  
      const tx = {
        from: userAddress,
        to: userAddress, 
        value: web3.utils.toWei("0.0001", "ether"),
        gas: 21000,
      };
  
      await web3.eth.sendTransaction(tx);
      message.success("Login successful with MetaMask!");
 
      history.push(roleRedirects[userData.role]);
  
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <MainContainer>
        <Container style={{ marginTop: 50 }}>
          <Row className="justify-content-center">
            <Col xs={24} sm={20} md={14} lg={10}>
              <Card
                style={{
                  padding: "25px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  background: "#fff",
                }}
              >
                <GoBackBtn path="/home/registerUsers" />
                <Title level={2} style={{ textAlign: "center", color: "#333" }}>
                  Login
                </Title>
                <Form form={form} layout="vertical" onFinish={handleLogin}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>
                  <Form.Item>
                  <Button type="default" htmlType="submit" loading={loading} block style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </MainContainer>
    </Layout>
  );
};

export default PatientLogin;
