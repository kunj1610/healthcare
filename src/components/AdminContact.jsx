import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts"); 
        const querySnapshot = await getDocs(contactsRef);
        const contactsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactsData);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        message.error("Failed to load contact details.");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h3>Contact Requests</h3>
      {loading ? <Spin size="large" /> : <Table dataSource={contacts} columns={columns} rowKey="id" />}
    </div>
  );
};

export default AdminContact;
