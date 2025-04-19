// Import necessary React hooks and components
import React, { useState, useEffect } from "react";
// Import Ant Design components for UI
import { Table, Spin, message } from "antd";
// Import Firestore functions and configuration
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// AdminContact component to display contact form submissions
const AdminContact = () => {
  // State for storing contact data and loading status
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch contacts when component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Get reference to contacts collection
        const contactsRef = collection(db, "contacts"); 
        // Fetch all documents from collection
        const querySnapshot = await getDocs(contactsRef);
        // Map document data to array with IDs
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

  // Define table columns configuration
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

  // Render component UI
  return (
    <div style={{ padding: "20px" }}>
      <h3>Contact Requests</h3>
      {/* Show loading spinner or table based on loading state */}
      {loading ? <Spin size="large" /> : <Table dataSource={contacts} columns={columns} rowKey="id" />}
    </div>
  );
};

export default AdminContact;
