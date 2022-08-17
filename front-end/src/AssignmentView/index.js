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
} from "react-bootstrap";
import ajax from "../Services/fetchService";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";
import { useParams } from "react-router-dom";
import CommentContainer from "../CommentContainer";
// import dayjs from 'react-dayjs';
// import { useInterval } from 'usehooks-ts';

const AssignmentView = () => {
  const user = useUser();
  const { assignmentId } = useParams();

  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("");
  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
    number: null,
    status: null,
  });
  // const emptyComment = {
  //   id: null,
  //   text: "",
  //   assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
  //   user: user.jwt,
  // };
  // const [comment, setComment] = useState(emptyComment);
  // const [comments, setComments] = useState([]);
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const prevassignmentValue = useRef(assignment);

  // useInterval(() => {
  //   updateCommentTimeDisplay();
  // }, 1000 * 5);

  // function updateCommentTimeDisplay() {
  //   console.log("Comment in update: ", comments);
  //   const commentsCopy = [...comments];
  //   commentsCopy.forEach(
  //     (comment) => (comment.createdDate = dayjs(comment.createdBy))
  //   );
  //   console.log("Copy of comments is: ", commentsCopy);
  //   setComments(commentsCopy);
  // }

  // function handleEditComment(commentId) {
  //   const i = comments.findIndex(comment => comment.id === commentId);
  //   console.log("I've been to edit this comment ", comments[i]);
  //   const commentCopy = {
  //     id: comments[i].id,
  //     text: comments[i].text,
  //     assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
  //     user: user.jwt,
  //   }
  //   setComment(commentCopy);
  // }

  // function handleDeleteComment(commentId) {
  //   console.log("I've been to delete this comment ", comment);
  // }

  // function updateComment(value) {
  //   const commetnCopy = { ...comment };
  //   commetnCopy.text = value;
  //   setComment(commetnCopy);
  // }

  // function submitComment() {
  //   if (comment.id) {
  //     ajax(`/api/comments/${comment.id}`, "PUT", user.jwt, comment)
  //     .then((d) => {
  //       const commentsCopy = [...comments];
  //       const i = commentsCopy.findIndex((comment) => comment.id === d.id);
  //       commentsCopy.push[i] = d;
  //       setComments(commentsCopy);
  //       setComment(emptyComment);
  //     });
  //   } else {
  //     ajax("/api/comments", "POST", user.jwt, comment).then((d) => {
  //     const commentsCopy = [...comments];
  //     commentsCopy.push(d);
  //     setComments(commentsCopy);
  //     setComment(emptyComment);
  //   });
  //   }

  // }

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
  }, [user.jwt]);

  // useEffect(() => {
  //   ajax(`/api/comments?assignmentId=${assignmentId}`, "GET", user.jwt).then(
  //     (commentsData) => {
  //       setComments(commentsData);
  //     }
  //   );
  // }, [comments]);

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
          {assignment.status === "Completed" ? (
            <>
              <Form.Group as={Row} className="d-flex align-items-center mb-3">
                <Form.Label column sm="3" md="2">
                  Code Review Video URL:
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <a
                    href={assignment.codeReviewVideoUrl}
                    style={{ fontWeight: "bold" }}
                  >
                    {assignment.codeReviewVideoUrl}
                  </a>
                </Col>
              </Form.Group>
              <div className="d-flex gap-5">
                <Button
                  type="submit"
                  variant="secondary"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Back
                </Button>
              </div>
            </>
          ) : assignment.status === "Pending Submission" ? (
            <div className="d-flex gap-5">
              <Button
                type="submit"
                variant="success"
                onClick={() => save("Submitted")}
              >
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
          ) : (
            <div className="d-flex gap-5">
              <Button
                type="submit"
                variant="success"
                onClick={() => save("Resubmitted")}
              >
                Resubmit Assignment
              </Button>
              <Button
                type="submit"
                variant="secondary"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Back
              </Button>
            </div>
          )}
            <CommentContainer assignmentId={assignmentId} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;