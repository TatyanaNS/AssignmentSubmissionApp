import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import ajax from "../Services/fetchService";
import jwt_decode from "jwt-decode";

const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  function climAsignment(asignment) {
    const decodeJwt = jwt_decode(jwt);
    console.log("decodeJwt: ", decodeJwt);
    const user = {
      id: null,
      username: decodeJwt.sub,
      authorities: decodeJwt.authorities,
    };
    asignment.codeReviewer = user;
    asignment.status = "In Review";
    ajax(`/api/assignments/${asignment.id}`, "PUT", jwt, asignment).then(
      (updateAssignment) => {
        // TODO: bla bla
        const assignmentCopy = [...assignments];
        const i = assignmentCopy.findIndex((a) => a.id === asignment.id);
        assignmentCopy[i] = updateAssignment;
        window.location.href = "/dashboard";
      }
    );
  }

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentData) => {
      setAssignments(assignmentData);
    });
  }, [jwt]);

//   function createAssignment() {
//     ajax("api/assignments", "POST", jwt).then((assignment) => {
//       window.location.href = `/assignments/${assignment.id}`;
//     });
//   }

  return (
    <Container>
      <div>
        <Row>
          <Col>
            <div
              className="d-flex justify-content-end"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setJwt(null);
                window.location.href = "/login";
              }}
            >
              Logout
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="h1">Code Reviewer Dashboard</div>
          </Col>
        </Row>
        <div className="assignment-wrapper in-review">
          <div className="assignment-wrapper-title h3 px-2">In Review</div>
          {assignments && assignments.filter((assignment) => assignment.status === "In Review").length > 0 ? (
            <div
              className="d-grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "In Review")
                .map((assignment) => (
                  <Card
                    key={assignment.id}
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body
                      className="d-flex flex-column justify-content-around"
                      style={{ margin: "5%" }}
                    >
                      <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <div className="d-flex align-items-start">
                        <Badge pill bg="success" style={{ fontSize: "1em" }}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <Card.Text style={{ marginTop: "1em" }}>
                        GitHub URL: {assignment.githubUrl}
                      </Card.Text>
                      <Card.Text style={{ marginTop: "1em" }}>
                        Branch: {assignment.branch}
                      </Card.Text>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          climAsignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No assignments found</div>
          )}
        </div>
        <div className="assignment-wrapper submited">
          <div className="assignment-wrapper-title h3 px-2">
            Awaiting Review
          </div>
          {(assignments && assignments.filter((assignment) => assignment.status === "Submitted").length > 0) ? (
            <div
              className="d-grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Submitted")
                .map((assignment) => (
                  <Card
                    key={assignment.id}
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body
                      className="d-flex flex-column justify-content-around"
                      style={{ margin: "5%" }}
                    >
                      <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <div className="d-flex align-items-start">
                        <Badge pill bg="success" style={{ fontSize: "1em" }}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <Card.Text style={{ marginTop: "1em" }}>
                        GitHub URL: {assignment.githubUrl}
                      </Card.Text>
                      <Card.Text style={{ marginTop: "1em" }}>
                        Branch: {assignment.branch}
                      </Card.Text>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          climAsignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No assignments found</div>
          )}
        </div>
        <div className="assignment-wrapper needs-update">
          <div className="assignment-wrapper-title h3 px-2">
            Needs Update
          </div>
          {assignments && assignments.filter((assignment) => assignment.status === "Needs Update").length > 0 ? (
            <div
              className="d-grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Needs Update")
                .map((assignment) => (
                  <Card
                    key={assignment.id}
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body
                      className="d-flex flex-column justify-content-around"
                      style={{ margin: "5%" }}
                    >
                      <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <div className="d-flex align-items-start">
                        <Badge pill bg="success" style={{ fontSize: "1em" }}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <Card.Text style={{ marginTop: "1em" }}>
                        GitHub URL: {assignment.githubUrl}
                      </Card.Text>
                      <Card.Text style={{ marginTop: "1em" }}>
                        Branch: {assignment.branch}
                      </Card.Text>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          climAsignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No assignments found</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;