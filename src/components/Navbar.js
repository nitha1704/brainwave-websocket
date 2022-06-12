import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Nav>
      <Link to="/singlechartpresent">Single Chart</Link>
      <Link to="/multiplechartpresent">Multiple Chart</Link>
      <Link to="/cpuchartjsblack">cpu usage</Link>

      <Link to="/singlechartwebsocket">Single Chart Websocket</Link>
      <Link to="/multiplechartwebsocket">Multiple Chart Websocket</Link>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  width: 40%;
  bottom: 0;
  right: 0;
  background-color: black;
  padding: 10px;
  z-index: 1;

  a {
    color: white;
    font-size: 20px;
    margin-right: 40px;
  }
`;

export default Navbar;
