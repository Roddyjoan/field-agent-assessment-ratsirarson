
import { useState, useEffect } from "react";
import Agent from "./Agent";

function Agents(){
    const [agents, setAgents] = useState([]);

    function errorHandler(rejectionMessage){
        console.log(rejectionMessage)
    }

   

    useEffect(() => {
    fetch("http://localhost:8080/api/agent", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            alert("Something went wrong while fetching...");
        }
    })
    .then(agentData => setAgents(agentData))
    .catch(rejection => () => errorHandler(rejection));
    }, []);

    function removeFromState(toDeleteId){
        setAgents(agents.filter(agent => agent.agentId !== toDeleteId))
    }

    function agentFactory(){
        return agents.map(agentObj => (
        <Agent 
        key={agentObj.agentId} 
        agentObj={agentObj} 
        agents={agents}
        setAgents={setAgents}
        removeFromState={removeFromState}
        />))
    }

    return (
        <>

        {agentFactory()}
        
        
       

        </>
    )
}

export default Agents;