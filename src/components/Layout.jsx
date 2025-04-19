// Import necessary dependencies from React
import React from "react";
// Import Header and Footer components
import Header from "./Header";
import Footer from "./Footer";

// Import styled-components for styling
import styled from "styled-components";

// Create styled container component for layout
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
`;

// Layout component that provides consistent page structure
function Layout(props) {
  return (
    <LayoutContainer>
      {/* Render header component */}
      <Header />
      {/* Render child components passed as props */}
      {props.children}
      {/* Render footer component */}
      <Footer />
    </LayoutContainer>
  );
}

// Export the Layout component
export default Layout;
