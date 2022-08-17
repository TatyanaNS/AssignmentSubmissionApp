import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import ajax from "../Services/fetchService";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";
import CommentContainer from "../CommentContainer";

const CodeReviewerAssignmentView = () => {
  // const [jwt, setJwt] = useLocalState("", "jwt");
  const user = useUser();
  const assignmentId = window.location.href.split("/assignments/")[1];

  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const prevassignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function persist() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  function save(status) {
    if (status && assignment.status !== status) {
      updateAssignment("status", status);
    } else {
      persist();
    }
  }

  useEffect(() => {
    if (prevassignmentValue.current.status !== assignment.status) {
      persist();
    }
    prevassignmentValue.current = assignment;
  }, [assignment]);

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", user.jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        setAssignmentStatuses(assignmentResponse.statusEnums);
      }
    );
  }, []);

  return (
    <Container className="mt-5">
      {assignment ? (
        <>
          <Row className="d-flex align-items-center">
            <Col>
              {assignment.number ? (
                <h1>Assignment {assignment.number}</h1>
              ) : (
                <></>
              )}
            </Col>
            <Col>
              <StatusBadge text={assignment.status} />
            </Col>
          </Row>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                type="url"
                id="githubUrl"
                readOnly
                value={assignment.githubUrl || ""}
                placeholder="https://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3" md="2">
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                id="branch"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                readOnly
                value={assignment.branch || ""}
                placeholder="main"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3" md="2">
              Video Review URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) =>
                  updateAssignment("codeReviewVideoUrl", e.target.value)
                }
                type="url"
                id="codeReviewVideoUrl"
                value={assignment.codeReviewVideoUrl || ""}
                placeholder="https://www.youtube.com/"
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            {assignment.status === "Completed" ?
                <Button
                type="submit"
                size="lg"
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}>
                Re-Claim
              </Button> :
              <Button
              type="submit"
              size="lg"
              variant="success"
              onClick={() => save(assignmentStatuses[4].status)}
            >
              Complite Review
            </Button>
            }
            
            {assignment.status === "Needs Update" ? (
                <Button
                    type="submit"
                    size="lg"
                    variant="secondary"
                    onClick={() => save(assignmentStatuses[2].status)}>
                    Re-Claim
                </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                variant="danger"
                onClick={() => save(assignmentStatuses[3].status)}
              >
                Rejct Assignment
              </Button>
            )}
            <Button
              size="lg"
              variant="secondary"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back
            </Button>
          </div>
          <CommentContainer assignmentId={assignmentId} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewerAssignmentView;