import React, { useEffect, useState } from "react";
// import { useLocalState } from "../util/useLocalStorage";
import { Card, Button, Row, Col } from "react-bootstrap";
import ajax from "../Services/fetchService";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const Dashboard = () => {
  const user = useUser();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignmentData) => {
      setAssignments(assignmentData);
    });
  }, [user.jwt]);

  function createAssignment() {
    ajax("api/assignments", "POST", user.jwt)
      .then((assignment) => {
        window.location.href = `/assignments/${assignment.id}`;
      });
  }

  return (
    <div style={{ margin: "2em" }}>
      <div>
        <Row>
          <Col>
            <div className="d-flex justify-content-end"
                style={{ cursor: "pointer"}} 
                onClick={() => {
                  user.setJwt(null);
                  window.location.href = "/login";
                }}>
              Logout</div>
          </Col>
        </Row>
      </div>
      <Button
        size="lg"
        className="mb-5"
        style={{ marginTop: "1em" }}
        onClick={() => createAssignment()}
      >
        Submit new Assignment
      </Button>
      {assignments ? (
        <div
          className="d-grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
        >
          {assignments.map((assignment) => (
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
                  variant="success"
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;