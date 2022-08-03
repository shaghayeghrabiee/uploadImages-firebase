import React, { useState ,useContext} from "react";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imageContext } from "../context/imageContextProvider";
import "../css/navBar.css";

const NavBar = () => {
  const {input,setInput} = useContext(imageContext);
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
        <Form className="d-flex">
          <FormControl
            placeholder="Search your image..."
            value={input}
            onChange={event=>setInput(event.target.value)}
          />
          <Button variant="primary" id="button-addon2">
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default NavBar;
