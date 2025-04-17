import React from "react";
import { FaGithub, FaCopyright } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import styled from "styled-components";

const FooterContainer = styled.div`
  background: #2d3b38cc;
  color: #fff;
  font-family: "Montserrat", sans-serif;
`;

const FooterWrap = styled.div`
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  `;

const GitHubIcon = styled(FaGithub)`
  font-size: 25px;
  margin: 10px auto;
  cursor: pointer;
`;

const CopyRightIcon = styled(FaCopyright)`
  margin: 0 10px;
`;

const Logo = styled.div`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;

  font-size: 1.5rem;

  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    color: #16c79a;
  }
`;

const CopyrightSection = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin: 10px auto;
`;

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <Logo to="/" onClick={toggleHome}>
        HEALTHCARE
        </Logo>
        <CopyrightSection>
          <div>Copyright</div>
          <CopyRightIcon />
          <div>{new Date().getFullYear()} All rights reserved.</div>
        </CopyrightSection>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
