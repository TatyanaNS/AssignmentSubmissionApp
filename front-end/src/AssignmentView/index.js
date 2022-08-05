import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Badge,
} from "react-bootstrap";
import ajax from "../Services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
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
    console.log("newAssignment = ", newAssignment);
    setAssignment(newAssignment);
  }

  function persist() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  function save() {
    console.log(`Status is: ${assignment.status}`);
    if (assignment.status === assignmentStatuses[0].status) {
      console.log("Setting new status to be: ", assignmentStatuses[1].status);
      updateAssignment("status", assignmentStatuses[1].status);
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
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
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
              <Badge pill bg="success" style={{ fontSize: "1em" }}>
                {assignment.status}
              </Badge>
            </Col>
          </Row>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3" md="2">
              Assignment Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                id="assignmentName"
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an assignment"
                }
                onSelect={(selectedElement) => {
                  updateAssignment("number", selectedElement);
                }}
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item
                    key={assignmentEnum.assignmentNum}
                    eventKey={assignmentEnum.assignmentNum}
                  >
                    {assignmentEnum.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                id="githubUrl"
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
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
                value={assignment.branch || ""}
                placeholder="main"
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            <Button type="submit" variant="success" onClick={() => save()}>
              Submit Assignment
            </Button>
            <Button
              type="submit"
              variant="secondary"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;