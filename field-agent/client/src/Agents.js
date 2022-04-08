
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

    function errorHandler(rejectionMessage){
        console.log(rejectionMessage)
    }


    function fetchAgents(){
    fetch("http://localhost:8080/api/agent")
    .then(response => response.json())
    .then(jsonData => setAgents(jsonData))
    .catch(rejection => () => errorHandler(rejection));
    }

   
    function agentFactory(){
        return agents.map(agentObj => (
        <Agent 
        key={agentObj.agentId} 
        agentObj={agentObj} 
        agents={agents}
        setAgents={setAgents}
        />))
    }

    return (
        <>
        {fetchAgents()}

        {agentFactory()}
        
        
       

        </>
    )
}

export default Agents;