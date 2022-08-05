import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Card, Button, Badge,Row, Col } from "react-bootstrap";
import ajax from "../Services/fetchService";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentData) => {
      setAssignments(assignmentData);
    });

    // fetch("api/assignments", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `Bearer ${jwt}`,
    //   },
    //   method: "GET",
    // })
    //   .then((Response) => {
    //     if (Response.status === 200) return Response.json();
    //   })
    //   .then((assignmentsData) => {
    //     setAssignments(assignmentsData);
    //   })
  }, [jwt]);

  function createAssignment() {
    ajax("api/assignments", "POST", jwt)
      // fetch("api/assignments", {
      //   headers: {
      //     "Content-Type": "application/json",
      //     authorization: `Bearer ${jwt}`,
      //   },
      //   method: "POST",
      // })
      //   .then((Response) => {
      //     if (Response.status === 200) return Response.json();
      //   })
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
                  setJwt(null);
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
            // <Col>
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
                  variant="success"
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
            // </Col>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
