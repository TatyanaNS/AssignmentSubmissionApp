import React, { useEffect, useState } from "react";
import { useLocalState } from '../util/useLocalStorage';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        fetch("api/assignments", {
            "headers": {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        }).then((Response) => {
            if (Response.status === 200) return Response.json();
        }).then((assignmentsData) => {
            setAssignments(assignmentsData);
        })
    }, []);

    function createAssignment() {
        fetch("api/assignments", {
            "headers": {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
            method: "POST",
        })
            .then((Response) => {
                if (Response.status === 200)
                    return Response.json();
            })
            .then((assignment) => {
                window.location.href = `/assignments/${assignment.id}`;
            });
    }

    return (
        <div style={{ margin: "2em" }}>
            {assignments ? assignments.map((assignment) => 
            <div>
                <Link to={`/assignments/${assignment.id}`}> Assignment ID: {assignment.id}
                </Link>
            </div>) : <></>}
            <button onClick={() => createAssignment()}>Submit new Assignment</button>
        </div>
    );
}

export default Dashboard;