import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import  { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const Login = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (user.jwt) return navigate("/dashboard");
  },[user]);

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt!");
      })
      .then(([body, headers]) => {
        user.setJwt(headers.get("authorization"));
        // window.location.href = "/dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center align-items-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username" className="fs-4">
                Username
              </Form.Label>
              <Form.Control
                type="email"
                id="username"
                placeholder="Enter username"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md="8" lg="6">
            <Form.Group>
              <Form.Label htmlFor="password" className="fs-4">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between">
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => sendLoginRequest()}
              variant="success"
            >
              Login
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={() => (window.location.href ("/"))}
              variant="secondary"
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;