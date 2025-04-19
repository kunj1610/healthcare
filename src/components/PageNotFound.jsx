// Import necessary dependencies from React
import React from "react";

// Import routing related hook from React Router
import { useHistory } from "react-router-dom";
// Import UI components from Ant Design
import { Result, Button } from "antd";
// Import layout components
import Layout from "./Layout";
import MainContainer from "./MainContainer";

// PageNotFound component that displays 404 error page
function PageNotFound() {
  // Get history object for navigation
  let history = useHistory();
  return (
    // Wrap content in Layout component
    <Layout>
      {/* Use MainContainer for consistent styling */}
      <MainContainer>
        {/* Display 404 error result with custom styling */}
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            // Button to navigate back to home page
            <Button type="primary" onClick={() => history.push("/")} style={{color: "#16c79a"}}>
              Back Home
            </Button>
          }
        />
      </MainContainer>
    </Layout>
  );
}

// Export the PageNotFound component
export default PageNotFound;
