// Import styled-components for styling
import styled from "styled-components";

// Import Link component from react-scroll for smooth scrolling
import { Link } from "react-scroll";

// Styled button component that extends Link
export const Button = styled(Link)`
  /* Set border radius for rounded corners */
  border-radius: 11px;
  
  /* Set background color based on primary prop */
  background: ${({ primary }) => (primary ? "#16C79A" : "#212b9c")};
  
  /* Prevent text wrapping */
  white-space: nowrap;
  
  /* Set padding based on big prop */
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  
  /* Set text color */
  color: #fff;
  
  /* Set font size based on fontBig prop */
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  
  /* Prevent text wrapping */
  white-space: nowrap;
  
  /* Override padding */
  padding: 10px 22px;
  
  /* Set font size and weight */
  font-size: 1.25rem;
  font-weight: bold;
  
  /* Remove default button styling */
  outline: none;
  border: none;
  
  /* Add pointer cursor */
  cursor: pointer;
  
  /* Add smooth transition effect */
  transition: all 0.2s ease-in-out;
  
  /* Remove text decoration */
  text-decoration: none;
  
  /* Center content using flexbox */
  display: flex;
  justify-content: center;
  align-items: space;

  /* Add margin around button */
  margin: 5px;

  /* Responsive font size for mobile */
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  /* Hover state styles */
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#16C79A" : "#185FEB")};
    color: black;
    
    /* Scale up button on hover */
    transform: scale(1.1);
  }
`;
