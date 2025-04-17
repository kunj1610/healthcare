import React from "react";

// import {
//   AboutSectionContainer,
//   AboutSectionWrapper,
//   AboutSectionTitle,
//   Divider,
//   AboutSectionSubtitle
// } from "./AboutElements";

import SVG2 from "../../assets/images/network.svg";

import styled from "styled-components";

import { FcInfo } from "react-icons/fc";
import { FiExternalLink } from "react-icons/fi";

const AboutSectionContainer = styled.div`
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
  backgroud-color: white;
`;

const AboutSectionWrapper = styled.div`
  display: flex;
  z-index: 1;
  height: 860px;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;

  margin-left: auto;
  padding: 0 24px;
  justify-content: center;

  @media screen and (max-width: 1089px) {
    height: auto;
    z-index: 0;
  }

  /* border: 1px solid green; */
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 50px 1fr;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 30px;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }

  &::before {
    content: "";
    flex: 1;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: "";
    flex: 1;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &:not(:empty)::before {
    margin-right: 0.25rem;
  }

  &:not(:empty)::after {
    margin-right: 0.25rem;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 20px;
  /* font-weight: bold; */

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  /* border: 1px solid red; */
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: center;
  margin: 10px;
`;

const Card = styled.div`
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin: 10px;
  width: 820px;
  border-radius: 10px;
  padding: 0;
  transition: transform 0.3s ease;

  @media screen and (max-width: 768px) {
    margin: 20px 0;
    width: 90%;
  }

  &:hover {
    transform: scale(1.025);
    filter: drop-shadow(0 0 0.75rem lightgrey);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40px;
`;

const CardContentContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;

  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CardLinkWrapper = styled.div`
  grid-row-start: 2;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
`;

const Icon = styled.div`
  align-self: flex-start;
  font-size: 20px;
  padding-right: 5px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardBody = styled.div`
  align-self: center;
`;

const CardPartWrap = styled.div`
  padding: 10px;
  text-align: center;
`;

const CardImage = styled.img`
  width: 210px;
  height: 210px;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const LearnMoreTxt = styled.a`
  padding-left: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #1890ff;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const CardTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const CardDescription = styled.p`
  font-size: 15px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

function AboutSection() {
  return (
    <AboutSectionContainer id="about">
      <AboutSectionWrapper>
        <GridContainer>
          <Title>About</Title>
          <SubTitle>Read to know some INFO about US</SubTitle>
          <CardContainer>
            <Card>
              {" "}
              <CardGrid>
                <CardContentContainer>
                  <Icon>
                    <FcInfo />
                  </Icon>
                  <CardBody>
                    <CardPartWrap>
                      <CardImage src={SVG2} alt="file" />
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardTitle>WELCOME TO YOUR HEALTH CARE</CardTitle>
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardDescription>
                        Egypt's healthcare system has embraced innovative
                        e-solutions, revolutionizing the way medical services
                        are delivered and managed. With the integration of
                        e-Health records, every patient visiting a doctor has
                        their medical history securely stored and easily
                        accessible through their electronic ID-card. This
                        seamless digital infrastructure enhances efficiency,
                        reduces administrative burdens, and ensures timely
                        medical interventions. The implementation of KSI
                        Blockchain technology further strengthens data security,
                        preventing unauthorized access and ensuring the
                        integrity of patient records. Additionally, Electronic
                        Health Records (EHRs) facilitate seamless communication
                        among healthcare providers, enabling smooth data
                        exchange across hospitals, laboratories, pharmacies, and
                        emergency services. This interconnected system not only
                        improves patient outcomes but also optimizes resource
                        utilization within the healthcare sector. To explore
                        more about blockchain applications in healthcare
                      </CardDescription>
                    </CardPartWrap>
                  </CardBody>
                </CardContentContainer>
              </CardGrid>
            </Card>
          </CardContainer>
        </GridContainer>
      </AboutSectionWrapper>
    </AboutSectionContainer>
  );
}

export default AboutSection;
