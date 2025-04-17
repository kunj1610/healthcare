// NavbarElements.js

import styled from "styled-components";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";

export const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? "#fff" : "transparent")};
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: background-color 0.4s ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
  color: #16c79a;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;

  img {
    width: 40px;
    height: 50px;
    margin-right: 10px;
  }

  &:hover {
    transform: scale(1.1);
    color: #16c79a;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)`
  color: #b5c5c1;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    transform: scale(1.1);
    color: #16c79a;
  }

  &.active {
    border-bottom: 3px solid #16c79a;
  }

  @media screen and (max-width: 837px) {
    font-size: 1rem;
  }
`;
