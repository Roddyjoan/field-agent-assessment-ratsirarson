import { useState} from "react";
function Addform(props){
    const [firstName, setFirstName] =useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [dob, setDob] = useState("");
    const [heightInInches, setHeightInInches] = useState("");

    function handleMiddleNameChange(event){
        setMiddleName(event.target.value);
    }

    function handleLastNameChange(event){
        setLastName(event.target.value);
    }

    function handleFirstNameChange(event){
        setFirstName(event.target.value);
        
    }

    function handleDobChange(event){
        setDob(event.target.value);
    }

    function handleHeightInInchesChange(event){
        setHeightInInches(event.target.value);
    }

    function addAgent(agentObj){
        props.setAgents([...props.agents, agentObj])
    }

    function handleSubmit(e) {
        e.preventDefault();
        let agentCopy = {};
        agentCopy.firstName = firstName;
        agentCopy.middleName = middleName;
        agentCopy.lastName = lastName;
        agentCopy.dob= dob;
        agentCopy.heightInInches = heightInInches;

        fetch("http://localhost:8080/api/agent/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agentCopy)
        }).then(
            response => response.ok ? addAgent(agentCopy) : alert("Something went totally wrong, my b homie")
        ).catch(
            rejection => alert("should definitely not be seeing this! "+rejection)
        );
    }

   


    return(
        <>
        <div className="add-form">
        <form onSubmit={handleSubmit}>
            <h2><b><mark>ADD AN AGENT</mark></b></h2>
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
            <label htmlFor="date-of-birth">Date Of Birth [yyyy-mm-dd] (required):</label>
            <br />
            <input onChange ={handleDobChange} id="date-of-birth"></input>
            </p>

            <p>
            <label htmlFor="height">Height in inches(required, between 36 and 96):</label>
            <br />
            <input onChange ={handleHeightInInchesChange} id="height"></input>
            </p>

            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
        
        </div>
        </>
    )

}

export default Addform;