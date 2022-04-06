
import { useState } from "react";
import Addform from "./Addform";
import Agent from "./Agent";

function Agents(){
    // fetch(URL-TO-ENDPOINT, INITIALIZATION-OBJECT);

    //FOR A POST REQUEST
    // fetch("http://localhost:8080/api/agent", {
    //     // fetch/CRUD method:

    //     method: "POST",
    //     //data object will be sent in JSON format
    //     headers: {
    //         "Content-Type": "application/json"
    //     },

    //     //the data object I am sending 
    //     body: JSON.stringify({name: "Bond, James Bond"})
    // })
    // fetch("http://localhost:8080/api/agent", {
    //     // fetch/CRUD method:

    //     method: "POST",
    //     //data object will be sent in JSON format
    //     headers: {
    //         "Content-Type": "application/json"
    //     },

    //     //the data object I am sending 
    //     body: JSON.stringify({name: "Bond, James Bond"})
    // })
    // .then(
    //     DO SOMETHING WITH THE DATA
    // )
    // .catch(
    //     DO SOMETHING ELSE IF FAILURE
    // )

    const [agents, setAgents] = useState([]);
    const [showAddForm, setShowAddFrom] = useState(false);
    const [showAgentForm, setShowAgentForm] = useState(false);

    
    const showAddAgentForm = (e) => {
        e.preventDefault();
        setShowAddFrom(!showAddForm);
    }
    function errorHandler(rejectionMessage){
        console.log(rejectionMessage)
    }


    function fetchAgents(){
    fetch("http://localhost:8080/api/agent")
    .then(response => response.json())
    .then(jsonData => setAgents(jsonData))
    .catch(rejection => () => errorHandler(rejection));
    setShowAgentForm(!showAgentForm);
    }
    
    function deleteAgent(id){
        let confirm = window.confirm("Are you sure you wnat to eliminate this agent D:?")

        if(confirm){
        fetch("http://localhost:8080/api/agent/" + id, {
        method: "DELETE",
        })
        .then(
        alert("You eliminated this agent. Cold, dude :( ")
        )

        //then display the list again but without the deleted agent
        fetch("http://localhost:8080/api/agent")
        .then(response => response.json())
        .then(jsonData => setAgents(jsonData))
        .catch(rejection => () => errorHandler(rejection))

        } else {
            alert("Agent not eliminated :D")
        }
        
    }

    function agentFactory(){
        return agents.map(agentObj => (
        <Agent 
        key={agentObj.agentId} 
        agentObj={agentObj} 
        agents={agents}
        setAgents={setAgents}
        deleteAgent={deleteAgent}
        />))
    }

    return (
        <>
        <button className="btn btn-secondary" onClick={fetchAgents}>Show/Hide Agents</button>
        <button className="btn btn-secondary" onClick={showAddAgentForm}> Add an agent</button>
        
        {showAddForm && (
            <Addform 
            agents={agents}
            setAgents={setAgents}/>
        )}
        
        {showAgentForm && (
        agentFactory()
        )}
        
       

        </>
    )
}

export default Agents;