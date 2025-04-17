import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { message } from "antd";
import { FcInfo } from "react-icons/fc";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import ActionPageLayout from "../../components/ActionPageLayout";
import ProtectedRoute from "../../components/Protected.route";
import PageNotFound from "../../components/PageNotFound";
import UserActions from "../../components/UserActions";
import AdminProfile from "../../components/AdminProfile";
import ProviderInfoCard from "../../components/ProviderInfoCard";
import ProviderImage from "../../assets/images/provider-avatar.png";
import "../../styles/adminHome.css";
import { db } from "../../firebase";
import Cookies from "js-cookie";
import AdminContact from "../../components/AdminContact";


// Define admin navigation actions
const adminActions = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Assign Patients to Doctors" },
  { id: 3, name: "Contact" },
];

// Component to fetch and display dynamic doctor data
const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const userID = Cookies.get("userID");
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Query "User" collection for documents where role equals "doctor"
        const usersRef = collection(db, "User");
        const q = query(usersRef, where("role", "==", "doctor"));
        const querySnapshot = await getDocs(q);
        const doctorsData = [];
        querySnapshot.forEach((doc) => {
          doctorsData.push(doc.data());
        });
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        message.error("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spinner animation="border" />
        <p>Loading doctors...</p>
      </div>
    );  
  }
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-evenly",
        padding: "10px",
      }}
    >
      {doctors.map((doctor, index) => (
        <ProviderInfoCard
          key={index}
          image={<img src={ProviderImage} alt="provider-avatar" />}
          name={doctor.fullName || doctor.fullname || "Doctor Name"}
          department={doctor.department || "Default Department"}
          uid={doctor.uid}
        />
      ))}
    </div>
  );
};

function AdminHome() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        {/* Admin Profile Route */}
        <ProtectedRoute exact path="/home/adminHome/Profile">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as admin
              </p>
            }
            actions={
              <UserActions actions={adminActions} userHome="/home/adminHome/" />
            }
            content={
              <AdminProfile
                fullname="Mohammed Tarek"
                hospital="Cairo Hospital"
                address="Cairo, Egypt"
                id="200123"
                expiration="01/05/2022"
              />
            }
          />
        </ProtectedRoute>

        {/* Dynamic Doctor List Route for Assigning Patients */}
        <ProtectedRoute exact path="/home/adminHome/AssignPatientsToDoctors">
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as admin
              </p>
            }
            actions={
              <UserActions actions={adminActions} userHome="/home/adminHome/" />
            }
            content={<DoctorList />}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home/adminHome/Contact">
  <ActionPageLayout
    status={
      <p style={{ color: "green", fontSize: "18px" }}>
        <FcInfo /> You are logged in as admin
      </p>
    }
    actions={<UserActions actions={adminActions} userHome="/home/adminHome/" />}
    content={<AdminContact />}
  />
</ProtectedRoute>
        {/* Default Route */}
        <Route exact path={match.path}>
          <ActionPageLayout
            status={
              <p style={{ color: "green", fontSize: "18px" }}>
                <FcInfo /> You are logged in as admin
              </p>
            }
            actions={
              <UserActions actions={adminActions} userHome="/home/adminHome/" />
            }
            content={
              <AdminProfile
                fullname="Mohammed Tarek"
                hospital="Cairo Hospital"
                address="Cairo, Egypt"
                id="200123"
                expiration="01/05/2022"
              />
            }
          />
        </Route>

        {/* Fallback for any unmatched route */}
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default AdminHome;
