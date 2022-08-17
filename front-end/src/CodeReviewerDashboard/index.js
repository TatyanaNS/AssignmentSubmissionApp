import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import ajax from "../Services/fetchService";
import jwt_decode from "jwt-decode";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const CodeReviewerDashboard = () => {
  const userJwt = useUser();
  const [assignments, setAssignments] = useState(null);

  function editReview (assignment) {
    window.location.href = `/assignments/${assignment.id}`;
  }

  function climAsignment(asignment) {
    const decodeJwt = jwt_decode(userJwt.jwt);
    const user = {
      id: null,
      username: decodeJwt.sub,
      authorities: decodeJwt.authorities,
    };

    asignment.codeReviewer = user;
    asignment.status = "In Review";
    ajax(`/api/assignments/${asignment.id}`, "PUT", userJwt.jwt, asignment).then(
      (updateAssignment) => {
        const assignmentCopy = [...assignments];
        const i = assignmentCopy.findIndex((a) => a.id === asignment.id);
        assignmentCopy[i] = updateAssignment;
        window.location.href = "/dashboard";
      }
    );
  }

  useEffect(() => {
    ajax("api/assignments", "GET", userJwt.jwt).then((assignmentData) => {
      setAssignments(assignmentData);
    });
  }, [userJwt.jwt]);

  return (
    <Container>
      <div>
        <Row>
          <Col>
            <div
              className="d-flex justify-content-end"
              style={{ cursor: "pointer" }}
              onClick={() => {
                userJwt.setJwt(null);
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
                        <StatusBadge text={assignment.status} />
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
                          editReview(assignment);
                        }}
                      >
                        Edit
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
          {(assignments && assignments.filter((assignment) => assignment.status === "Submitted"
            || assignment.status === "Resubmitted").length > 0) ? (
            <div
              className="d-grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Submitted"
                        || assignment.status === "Resubmitted")
                .sort((a,b) => { 
                  if (a.status === "Resubmitted") return -1;
                  else return 1;
                })
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
                        <StatusBadge text={assignment.status} />
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
                        <StatusBadge text={assignment.status} />
                      </div>
                      <Card.Text style={{ marginTop: "1em" }}>
                        GitHub URL: {assignment.githubUrl}
                      </Card.Text>
                      <Card.Text style={{ marginTop: "1em" }}>
                        Branch: {assignment.branch}
                      </Card.Text>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          window.location.href = `/assignments/${assignment.id}`;
                        }}
                      >
                        View
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