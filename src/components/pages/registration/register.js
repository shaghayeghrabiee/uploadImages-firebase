import React, { useEffect, useState, useRef } from "react";
import "../../css/registration.css";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Routes, Route,Link } from "react-router-dom";
import Login from "./login";

const EMAIL_REGEX =
  /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailTest = EMAIL_REGEX.test(email);
    const pwdTest = PWD_REGEX.test(pwd);
    if (!emailTest || !pwdTest) {
      setErrMsg("Invalid Entry");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(email));
    localStorage.setItem("Password", JSON.stringify(pwd));
    setSuccess(true);
    setEmail("");
    setPwd("");
    setMatchPwd("");
    setFirstName("");
    setLastName("");
     toast.success("You are registered!");
  };
   
  return (
    <>
      {success ? (
          <Login/>
      ) : (
        <Container id="main-container" className="d-grid h-100">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Form
            id="register-form"
            className="text-center w-100"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-3 fw-bold title">Sign-Up</h1>
            <Form.Group className="mb-1">
              <Form.Control
                ref={emailRef}
                type="email"
                size="md"
                required
                placeholder="Email address"
                autoComplete="username"
                className="position-relative"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                size="md"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                autoComplete="off"
                className="position-relative"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                size="md"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                autoComplete="off"
                className="position-relative"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="password"
                size="md"
                placeholder="Password"
                required
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoComplete="off"
                className="position-relative"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                size="md"
                placeholder="Confirm password"
                required
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                autoComplete="off"
                className="position-relative"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                Must match the first password input field.
              </p>
            </Form.Group>
            <div className="d-grid">
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </div>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Register;
