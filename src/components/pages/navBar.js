import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/navBar.css";

const NavBar = () => {

  return (
    <div id="navBarContainer">
      <Navbar bg="white" variant="white">
        <Nav className="me-auto d-flex justify-content-around">
          <Link className="navLink" to="/home">
            Home
          </Link>
          <Link className="navLink" to="/login">
            LogOut
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
