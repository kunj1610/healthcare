// Navbar.js

import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import img from "../../assets/images/Logo.png";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "./NavbarElements";
import { animateScroll as scroll } from "react-scroll";
import { IconContext } from "react-icons/lib";
import { Link ,useLocation } from "react-router-dom";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const location = useLocation(); 

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              <img
                src={img}
                alt="Logo"
                style={{ width: "40px", height: "50px", marginRight: "10px" }}
              />
              HealthCARE
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            {location.pathname === "/issueUserID" ? (
              <NavMenu>
                <NavItem>
                  <NavLinks as={Link} to="/">
                    Back
                  </NavLinks>
                </NavItem>
              </NavMenu>
            ) : (
              <NavMenu>
                <NavItem>
                  <NavLinks
                    to="about"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    About
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="demo"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Overview
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="contact"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Contact
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks as={Link} to="/issueUserID">
                    Registration
                  </NavLinks>
                </NavItem>
              </NavMenu>
            )}
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
