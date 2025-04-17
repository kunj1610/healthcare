import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Cookies from "js-cookie"; 
import ProtectedRoute from "../../components/Protected.route";
import PatientInfoCard from "../../components/PatientInfoCard";
import PatientRecordPage from "./patientRecordPage/PatientRecordPage";

export default function AssignedPatients() {
  let match = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  
  useEffect(() => {
    async function fetchAssignedPatients() {
      try {
        // Get doctor ID from cookies
        const doctorID = Cookies.get("userID");
        if (!doctorID) {
          console.error("Doctor ID not found in cookies.");
          return;
        }

        // Step 1: Get Assigned Patients
        const assignedRef = collection(db, "AssignedPatients");
        const assignedQuery = query(assignedRef, where("doctorID", "==", doctorID));
        const assignedSnapshot = await getDocs(assignedQuery);

        const patientIDs = assignedSnapshot.docs.map(doc => doc.data().patientID);

        if (patientIDs.length === 0) {
          console.log("No assigned patients found.");
          return;
        }

        // Step 2: Fetch Patient Details
        const usersRef = collection(db, "User");
        const patientsQuery = query(usersRef, where("uid", "in", patientIDs));
        const patientsSnapshot = await getDocs(patientsQuery);

        let fetchedUsers = [];
        patientsSnapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() });
        });

        setAllUsers(fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchAssignedPatients();
  }, []);

  function filterCards(event) {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter((user) =>
      `${user.firstname} ${user.lastname}`.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
     }

  return (
    <Switch>
      <Route exact path={match.path}>
        <h1 style={{ color: "#57625f" }}>Assigned Patients</h1>
        <input
          placeholder="Search by patient name"
          onInput={filterCards}
          style={{
            outline: "none",
            width: "100%",
            border: "1px solid #bfbfbfdb",
            fontSize: "0.9rem",
            padding: "1rem",
            borderRadius: ".5rem",
          }}
        />
        <div
          style={{
            display: "flex",
            margin: "20px",
            flexWrap: "wrap",
          }}
        >
          {users.map((user) => (
          
            <PatientInfoCard
              firstname={user.firstname}
              lastname={user.lastname}
              address={user.address}
              uid={user.uid}
              id={user.id}
              key={user.id}
            />
          ))}
        </div>
      </Route>

      {users.map((user) => (
        <ProtectedRoute
          key={user.id}
          path={`${match.path}/${user.firstname + user.lastname + user.id}`}
        >
          <PatientRecordPage user={user} />
        </ProtectedRoute>
      ))}
    </Switch>
  );
}




