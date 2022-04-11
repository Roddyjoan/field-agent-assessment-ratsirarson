import { useState } from "react";
function Editform(props) {
    //now we have access to props.agentObj bc in Agent.js, under forms pushed over here
    //now we have access to props.agents and props.setAgents
    //so props.agentObj.firstName
    //create state to hold this data
    //creat onstate method where we change this data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [dob, setDob] = useState("");
    const [heightInInches, setHeightInInches] = useState("");
    const [showForm, setShowForm] = useState(false);

    const showTheForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    }

    function handleMiddleNameChange(event) {
        setMiddleName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handleFirstNameChange(event) {
        // event.target.value
        // console.log("event", event);
        // console.log("event target",event.target);
        // console.log("event target value",event.target.value);
        setFirstName(event.target.value);

    }

    function handleDobChange(event) {
        setDob(event.target.value);
    }

    function handleHeightInInchesChange(event) {
        setHeightInInches(event.target.value);
    }

    function replaceAgent(agentObj) {
        // return all agents except the one we are working with
        let filteredAgents = props.agents.filter(agent => agent.agentId !== agentObj.agentId);
        props.setAgents([agentObj, ...filteredAgents])
    }

    function handleSubmit(e) {
        e.preventDefault();
        let agentCopy = { ...props.agentObj };
        agentCopy.firstName = firstName;
        agentCopy.middleName = middleName;
        agentCopy.lastName = lastName;
        agentCopy.dob = dob;
        agentCopy.heightInInches = heightInInches;

        fetch("http://localhost:8080/api/agent/" + agentCopy.agentId, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agentCopy)
        }).then(
            response => {
                if (response.ok) {
                    alert("Agent Successfully Updated!")
                    replaceAgent(agentCopy)
                }
                else if (response.status === 403) {
                    alert("Only an Admin can Edit Agents")
                }
                else {
                    alert("Please Fill out All required Fields")
                }
            }
        ).catch(
            rejection => alert("should definitely not be seeing this! " + rejection)
        );


    }




    return (
        <>


            <form onSubmit={handleSubmit}>
                <button className="btn btn-dark" onClick={showTheForm}>Edit Agent</button>
            </form>
            {showForm && (
                <div className="edit-form">
                    <h4> <b>Edit this Agent</b></h4>
                    <p>
                        <label htmlFor="first-name">First Name(required):</label>
                        <br />
                        <input onChange={handleFirstNameChange} id="first-name" value={props.agentObj.firstName}></input>
                    </p>

                    <p>
                        <label htmlFor="middle-name">Middle Name(optional):</label>
                        <br />
                        <input onChange={handleMiddleNameChange} id="middle-name" value={props.agentObj.middleName}></input>
                    </p>

                    <p>
                        <label htmlFor="last-name">Last Name(required):</label>
                        <br />
                        <input onChange={handleLastNameChange} id="last-name" value={props.agentObj.lastName}></input>
                    </p>

                    <p>
                        <label htmlFor="date-of-birth">Date Of Birth(required):</label>
                        <br />
                        <input onChange={handleDobChange} id="date-of-birth" value={props.agentObj.dob}></input>
                    </p>

                    <p>
                        <label htmlFor="height">Height in inches(required, between 36 and 96):</label>
                        <br />
                        <input onChange={handleHeightInInchesChange} id="height" value={props.agentObj.heightInInches}></input>
                    </p>

                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>

            )}

        </>

    )


}

export default Editform;


// import { useState } from "react";

// function Editform(props) {
//     // props.agentObj
//     // props.agentObj.firstName
//     // props.agents
//     // props.setAgents

//     const [firstName, setFirstName] = useState("");

//     function editFormShow() {
//         let editForm = document.querySelector("#edit-form-" + props.agentObj.id);
//         if (editForm.classList.contains("hidden")) {
//             editForm.classList.remove("hidden");
//         } else {
//             editForm.classList.add("hidden");
//         }
//     }

//     function handleFirstNameChange(event) {
//         setFirstName(event.target.value);
//     }

//     function replaceAgent(agentObj) {
//         let filteredAgents = props.agents.filter(agent => agent.agentId !== agentObj.agentId);
//         props.setAgents([agentObj, ...filteredAgents])
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         let agentCopy = {...props.agentObj};
//         agentCopy.firstName = firstName;

//         fetch("http://localhost:8080/agents/" + agentCopy.id, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(agentCopy)
//         }).then(
//             response => response.ok ? replaceAgent(agentCopy) : alert("Something went wrong! " + response)
//         ).catch(
//             rejection => alert(rejection)
//         );
//         editFormShow();
//     }

//     return (
//         <>
//             <form id={"edit-form-" + props.agentObj.id} className="hidden" onSubmit={handleSubmit}>
//                 <label htmlFor="first-name">First Name:</label><br />
//                 <input onChange={handleFirstNameChange} id="first-name"></input><br />
//                 <button>Submit</button>
//             </form>
//             <button onClick={editFormShow}>Delete Agent</button>
//         </>
//     )
// }

// export default Editform;