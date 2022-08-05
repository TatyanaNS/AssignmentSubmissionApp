import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useLocalState } from "../util/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  // const [errorMsg, setErrorMsg] = useState(null);

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };

    // useEffect(() => {
    //   const reqBody = {
    //     "username": "admin",
    //     "password": "admin-123"
    //   };

    // ajax("/api/auth/login", "POST", reqBody)
    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        console.log("response = ", response);
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt!");
      })
      .then(([body, headers]) => {
        // headers.forEach((Element) => {
        //   console.log(Element);
        // })
        setJwt(headers.get("authorization"));
        window.location.href = "/dashboard";
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
              onClick={() => (window.location.href = "/")}
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
