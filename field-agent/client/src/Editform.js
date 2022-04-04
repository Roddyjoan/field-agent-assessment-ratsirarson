import { useState } from "react";
function Editform(props){
    //now we have access to props.agentObj bc in Agent.js, under forms pushed over here
    //now we have access to props.agents and props.setAgents
    //so props.agentObj.firstName
    //create state to hold this data
    //creat onstate method where we change this data
    const [firstName, setFirstName] =useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [dob, setDob] = useState("");
    const [heightInInches, setHeightInInches] = useState("");
    const [showForm, setShowForm] = useState(false);

    const showTheForm = (e) =>{
        e.preventDefault();
        setShowForm(!showForm);
    }

    function handleMiddleNameChange(event){
        setMiddleName(event.target.value);
    }

    function handleLastNameChange(event){
        setLastName(event.target.value);
    }

    function handleFirstNameChange(event){
        // event.target.value
        // console.log("event", event);
        // console.log("event target",event.target);
        // console.log("event target value",event.target.value);
        setFirstName(event.target.value);
        
    }

    function handleDobChange(event){
        setDob(event.target.value);
    }

    function handleHeightInInchesChange(event){
        setHeightInInches(event.target.value);
    }

    function replaceAgent(agentObj){
        // return all agents except the one we are working with
        let filteredAgents = props.agents.filter(agent => agent.agentId !== agentObj.agentId);
        props.setAgents([agentObj, ...filteredAgents])
    }

    function handleSubmit(e) {
        e.preventDefault();
        let agentCopy = {...props.agentObj};
        agentCopy.firstName = firstName;
        agentCopy.middleName = middleName;
        agentCopy.lastName = lastName;
        agentCopy.dob= dob;
        agentCopy.heightInInches = heightInInches;

        fetch("http://localhost:8080/api/agent/" + agentCopy.agentId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agentCopy)
        }).then(
            response => response.ok ? replaceAgent(agentCopy) : alert("Please fill out the required fields")
        ).catch(
            rejection => alert("should definitely not be seeing this! "+rejection)
        );
        
        
    }

   


    return(
        <>
       
        
        <form onSubmit={handleSubmit}>
            <button className="btn btn-outline-info" onClick={showTheForm}>Edit Agent</button>
        </form>
        {showForm &&(
        <div className="edit-form">
            <h4> <b>Edit this Agent</b></h4>
            <p>
            <label htmlFor="first-name">First Name(required):</label>
            <br />
            <input onChange ={handleFirstNameChange} id="first-name"></input>
            </p>
            
            <p>
            <label htmlFor="middle-name">Middle Name(optional):</label>
            <br />
            <input onChange ={handleMiddleNameChange} id="middle-name"></input>
            </p>

            <p>
            <label htmlFor="last-name">Last Name(required):</label>
            <br />
            <input onChange ={handleLastNameChange} id="last-name"></input>
            </p>

            <p>
            <label htmlFor="date-of-birth">Date Of Birth(required):</label>
            <br />
            <input onChange ={handleDobChange} id="date-of-birth"></input>
            </p>

            <p>
            <label htmlFor="height">Height in inches(required, between 36 and 96):</label>
            <br />
            <input onChange ={handleHeightInInchesChange} id="height"></input>
            </p>

            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        
        )}
        
        </>
        
    )


}

export default Editform;

