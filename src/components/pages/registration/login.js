import React, { useState } from "react";
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "../home";
import "../../css/registration.css";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginHandler = () => {
    let pass = localStorage.getItem("Password").replace(/"/g, "");
    let user = localStorage.getItem("currentUser").replace(/"/g, "");
  if (password !== pass || email !== user) {
    setError(true);
  } else {
    setLogin(true);
    setError(false);
  }
  };

  return (
    <>
      {login ? (
       <Home/>
      )
      :(
        <Container id="main-container" className="d-grid h-100">
          <Form id="register-form" className="text-center w-100">
            <h1 className="mb-3 title">Sign-In</h1>
            <Form.Group className="mb-1">
              <Form.Control
                type="email"
                size="md"
                placeholder="Email address"
                autoComplete="username"
                className="position-relative"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="password"
                size="md"
                placeholder="Password"
                autoComplete="off"
                className="position-relative"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Row className="align-items-center justify-content-between mt-3">
              <Col>
                <Button variant="primary" size="lg" onClick={loginHandler}>
                  Login
                </Button>
              </Col>
              <Col>
                <Link className="singUpBtn fw-bold" to="/signUp">
                  Sign Up
                </Link>
              </Col>
            </Row>
            {error && (
              <Alert color="primary" variant="warning">
                Fill correct Info else keep trying.
              </Alert>
            )}
          </Form>
        </Container>
      )   
      }
    </>
  );
};

export default Login;
