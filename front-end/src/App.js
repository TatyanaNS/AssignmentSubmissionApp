import { Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./App.css";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import CodeReviewerAssignmentView from "./CodeReviewerAssignmentView";
import { UserProvider, useUser } from "./UserProvider";

function App() {
  const user = useUser();
  const [roles, setRole] = useState(getRoleFromJWT());

  useEffect(() => {
    setRole(getRoleFromJWT());
  }, [user.jwt]);

  function getRoleFromJWT() {
    if (user.jwt) {
      let decodeJwt = jwt_decode(user.jwt);
      return decodeJwt.authorities;
    }
    return [];
  }

  // useEffect(() => {
  //   const reqBody = {
  //     "username": "admin",
  //     "password": "admin-123"
  //   };

  //   fetch("api/auth/login", {
  //     "headers": {
  //       "Content-Type": "application/json"
  //     },
  //     method: "post",
  //     body: JSON.stringify(reqBody)
  //   }).then((response) => Promise.all([response.json(), response.headers]))
  //     .then(([body, headers]) => {
  //     // headers.forEach((Element) => {
  //     //   console.log(Element);
  //     // })

  //     setJwt(headers.get("authorization"));

  //     });
  // }, []);

  // useEffect(() => {
  //   console.log(`We have the JWT: ${jwt}`);
  // }, [jwt]);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:assignmentId"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;