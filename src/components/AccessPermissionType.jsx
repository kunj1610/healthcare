// Import React library
import React from "react";

// Import required components and icons from Ant Design
import { Menu, Dropdown, Button, message, Space, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
// Import access icon from react-icons
import { SiOpenaccess } from "react-icons/si";

// Import styled-components for styling
import styled from "styled-components";

// Styled component for the container div
const AccessContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    
`;

// Styled component for the label text
const TextLabel = styled.div`
    align-self: center;
    padding-right: 10px;
`;

// Destructure Option from Select component
const { Option } = Select;

// AccessPermissionType component that takes props as parameter
export default function AccessPermissionType(props) {
 
  return (
    // Main container for the access permission selector
    <AccessContainer>

    {/* Label for the select dropdown */}
    <TextLabel>Access Permission Type</TextLabel>

    {/* Select dropdown with custom styling and icons */}
    <Select defaultValue="Select Permission Type" onChange={props.handleClick} 
        suffixIcon={<SiOpenaccess />} 
        menuItemSelectedIcon={<SiOpenaccess />}
        style={{width:"230px"}}
        > 
      {/* Option for full access permission */}
      <Option value="Full Access">Full Access</Option>
      {/* Option for read only permission */}
      <Option value="Read Only">Read Only</Option>
      {/* Option for write only permission */}
      <Option value="Write Only">Write Only</Option>
    </Select>

    </AccessContainer>
 
  );
}
