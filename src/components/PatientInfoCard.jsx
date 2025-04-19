// Import necessary dependencies from React
import React from "react";

// Import custom styles for the patient info card
import "../styles/patientInfoCard.css";
// Import Blockies for generating blockchain identicons
import Blockies from "react-blockies";
// Import Typography component from Ant Design
import { Typography } from "antd";
// Import copy icon from Ant Design icons
import { CopyOutlined } from "@ant-design/icons";

// Import routing related components from React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";

// Destructure Paragraph component from Typography
const { Paragraph } = Typography;

// PatientInfoCard component that displays individual patient information
function PatientInfoCard(props) {
  // Get the current route match object
  let match = useRouteMatch();
  // Get the history object for navigation
  let history = useHistory();

  // Function to handle dynamic routing based on patient info
  function dynamicUserRoutes() {
    let path = `${match.path}/${props.firstname + props.lastname + props.id}`;
    // alert(path);
    history.push(path);
  }

  // Render patient card with name, ID and view records button
  return (
    <div className="patient-card">
      <div className="patient-card-title">
        <p>
          {props.firstname} {props.lastname}
        </p>
      </div>
      <div className="patient-card-body">
        <Paragraph
          copyable={{
            text: props.uid,
            icon: <CopyOutlined />,
          }}
          style={{ fontSize: "16px", }}
        >
          {`${props.uid.substring(0, 9)}...`}
        </Paragraph>
        <p>
          {" "}
          <Blockies seed={props.uid} size={5} scale={8} />
        </p>
        <button className="patient-card-button" onClick={dynamicUserRoutes}>
          View Records{" "}
        </button>
      </div>
    </div>
  );
}

// Export the PatientInfoCard component
export default PatientInfoCard;
