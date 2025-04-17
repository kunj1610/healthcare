import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, Select, Typography, notification, message } from "antd";
import { useHistory } from "react-router-dom";
import { db, collection, addDoc } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import GoBackBtn from "../../components/GoBackBtn";
import UserPassPhraseModel from "../../components/UserPassPhraseModel";
import "../../styles/registerPatient.css";

const { Title } = Typography;
const { Option } = Select;

const RegisterPatientForm = () => {
  let history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const auth = getAuth();

  const warnUserToDownload = () => {
    notification.warning({
      message: "Download Identity Keys",
      description: "You must download your identity keys before registering.",
    });
    message.warn("You need to download your identity keys first");
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    setFormData(values);

    try {
      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      // Store other patient details in Firestore
      await addDoc(collection(db, "User"), {
        uid: user.uid,
        firstname: values.firstname,
        lastname: values.lastname,
        nationalID: values.nationalID,
        age: values.age,
        phone: values.phone,
        email: values.email,
        city: values.city,
        address: values.address,
        zipCode: values.zipCode,
        maritalStatus: values.maritalStatus,
        gender: values.gender,
        bloodType: values.bloodType,
        allergy: values.allergy,
        chronicDiseases: values.chronicDiseases,
        role: "patient",
        createdAt: new Date(),
      });

      message.success("Patient Registered Successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Error registering user:", error);
      message.error(error.message);
    }
  };

  const encryptionPassphrase = (passphrase) => {
    history.push("/home/patientHome");
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="register-form">
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item label="First Name" name="firstname" rules={[{ required: true }]}> 
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname" rules={[{ required: true }]}> 
            <Input placeholder="Enter Last Name" />
          </Form.Item>
          <Form.Item label="National ID" name="nationalID" rules={[{ required: true }]}> 
            <Input placeholder="Enter National ID" />
          </Form.Item>
          <Form.Item label="Age" name="age" rules={[{ required: true }]}> 
            <Input placeholder="Enter Age" type="number" />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}> 
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}> 
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}> 
            <Input.Password placeholder="Enter Password" />
          </Form.Item>
          <Form.Item label="City" name="city" rules={[{ required: true }]}> 
            <Input placeholder="Enter City" />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}> 
            <Input placeholder="Enter Address" />
          </Form.Item>
          <Form.Item label="Zip Code" name="zipCode" rules={[{ required: true }]}> 
            <Input placeholder="Enter Zip Code" />
          </Form.Item>
          <Form.Item label="Marital Status" name="maritalStatus" rules={[{ required: true }]}> 
            <Select placeholder="Select Marital Status">
              <Option value="single">Single</Option>
              <Option value="married">Married</Option>
              <Option value="divorced">Divorced</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={[{ required: true }]}> 
            <Select placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Blood Type" name="bloodType" rules={[{ required: true }]}> 
            <Select placeholder="Select Blood Type">
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="O">O</Option>
              <Option value="AB">AB</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Allergy" name="allergy" rules={[{ required: true }]}> 
            <Input placeholder="Enter Allergy Information" />
          </Form.Item>
          <Form.Item label="Chronic Diseases" name="chronicDiseases" rules={[{ required: true }]}> 
            <Input placeholder="Enter Chronic Diseases" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-btn">
          Register
        </Button>
      </Form.Item>
      <UserPassPhraseModel showModal={showModal} setShowModal={setShowModal} getPhrase={encryptionPassphrase} />
    </Form>
  );
};

const RegisterPatient = () => {
  return (
    <Layout>
      <MainContainer>
        <Container>
          <Row className="justify-content-center">
            <Col xs={24} md={10} className="form-container">
              <GoBackBtn path="/home/registerUsers" />
              <Title level={2} className="form-title">Patient Registration Form</Title>
              <RegisterPatientForm />
            </Col>
          </Row>
        </Container>
      </MainContainer>
    </Layout>
  );
};

export default RegisterPatient;
