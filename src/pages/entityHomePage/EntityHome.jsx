import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Table, Dropdown, Menu, message, Empty } from "antd";
import { HiClipboardCopy } from "react-icons/hi";
import { BsPersonBoundingBox } from "react-icons/bs";
import { RiProfileLine } from "react-icons/ri";
import Blockies from "react-blockies";
import { DownOutlined } from "@ant-design/icons";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import ActionPageLayout from "../../components/ActionPageLayout";
import ProtectedRoute from "../../components/Protected.route";
import PageNotFound from "../../components/PageNotFound";
import UserActions from "../../components/UserActions";
import EntityProfile from "../../components/EntityProfile";
import { Modal, Button, Space } from "antd";
import VerifyIcon from "../../assets/images/verifyIcon.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import { Typography } from "antd";
import { Divider } from "antd";

const db = getFirestore();
const { Paragraph } = Typography;
const fetchLabRecords = async (labId) => {
  try {
    const q = query(collection(db, "LabsRecord"), where("labId", "==", labId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching lab records:", error);
    return [];
  }
};

export default function EntityHome() {
  let match = useRouteMatch();
  const [records, setRecords] = useState([]);
  console.log(records)
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchLabRecords(user.uid).then(setRecords);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchLabRecords(user.uid).then(setRecords);
    }
  }, [auth.currentUser]);



  const onClick = ({ key }) => {
    const selectedRecord = records.find((rec) => rec.id === key);
    if (selectedRecord) {
      info(selectedRecord);
    } else {
      message.error("Record not found");
    }
  };

  function info(record) {
    return Modal.info({
      closable: true,
      width: 900,
      title: "",
      content: (
        <Container style={{ padding: "40px" }}>
          <Row>
            <Col>
              <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                Electronic Health Record
              </div>
            </Col>
            <Col>
              <div style={{ textAlign: "right" }}>
                <img src={VerifyIcon} alt="verify-logo" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <span style={{ fontWeight: "bold" }}>Record name: </span>
                {record.recordName}
              </div>
            </Col>
            <Col>
              <div style={{ textAlign: "right" }}>Signed by patient</div>
            </Col>
          </Row>
          <Row style={{ margin: "10px" }}>
            <Col>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                  borderRadius: "7px",
                  backgroundColor: "#FAFAFA",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <QRCode value={record.id} size={200} />
              </div>
            </Col>
            <Col style={{ marginTop: "50px" }}>
              <Row>
                <Col>
                  <div style={{ fontWeight: "bold" }}>Patient Address</div>
                </Col>
                <Col>
                <Paragraph
  copyable={{
    icon: <HiClipboardCopy style={{ fontSize: "20px" }} />,
  }}
>
  <span>
    {record.patientId?.length > 42
      ? `${record.patientId.substring(0, 6)}...${record.patientId.substring(36, 42)}`
      : record.patientId || "N/A"}
  </span>
</Paragraph>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col>
                  <div style={{ fontWeight: "bold" }}>Format</div>
                </Col>
                <Col>{record.format || "N/A"}</Col>
                <Divider />
              </Row>
              <Row>
                <Col>
                  <div style={{ fontWeight: "bold" }}>Date</div>
                </Col>
                <Col>{record.timestamp ? new Date(record.timestamp.seconds * 1000).toLocaleString() : "Unknown"}</Col>
              </Row>
            </Col>
          </Row>
          
         
        </Container>
      ),
      onOk() {},
    });
  }

  const menu = (
    <Menu onClick={onClick}>
      {records.map((record) => (
        <Menu.Item key={record.id}>{record.recordName}</Menu.Item>
      ))}
    </Menu>
  );

  const dataSource = records.map((record) => ({
    key: record.id,
    patient: (
      <div>
        <Blockies seed={record.patientId} size={8} scale={3} />
        <span style={{ padding: "20px" }}>{record.patientId}</span>
      </div>
    ),
    record: <Dropdown overlay={menu}><a onClick={(e) => e.preventDefault()}>Records <DownOutlined /></a></Dropdown>,
  }));

  const columns = [
    {
      title: <span><BsPersonBoundingBox /> Patient</span>,
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: <span><RiProfileLine /> Shared Records</span>,
      dataIndex: "record",
      key: "record",
    },
  ];

  const tableOfData = (
    <div>
      <h3>Shared Records</h3>
      {records.length ? <Table dataSource={dataSource} columns={columns} /> : <Empty />}
    </div>
  );

  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home/entityHome/Profile">
          <ActionPageLayout
            status={<p style={{ color: "green", fontSize: "18px" }}>You are logged in as entity</p>}
            actions={<UserActions actions={[{ id: 1, name: "Profile" }, { id: 2, name: "View Shared Records" }]} userHome="/home/entityHome/" />}
            content={<EntityProfile fullname="Mohammed Fajer" hospital="Manchester Hospital" address="Hathersage Rd, Rusholme, Manchester M13 0JH" id="200123" expiration="01/05/2022" />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/entityHome/ViewSharedRecords">
          <ActionPageLayout
            status={<p style={{ color: "green", fontSize: "18px" }}>You are logged in as entity</p>}
            actions={<UserActions actions={[{ id: 1, name: "Profile" }, { id: 2, name: "View Shared Records" }]} userHome="/home/entityHome/" />}
            content={tableOfData}
          />
        </ProtectedRoute>
        <Route exact path={match.path}>
          <ActionPageLayout
            status={<p style={{ color: "green", fontSize: "18px" }}>You are logged in as entity</p>}
            actions={<UserActions actions={[{ id: 1, name: "Profile" }, { id: 2, name: "View Shared Records" }]} userHome="/home/entityHome/" />}
            content={<EntityProfile fullname="Mohammed Fajer" hospital="Manchester Hospital" address="Hathersage Rd, Rusholme, Manchester M13 0JH" id="200123" expiration="01/05/2022" />}
          />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}
