import Editform from "./Editform";
function Agent(props){
    //props.agentObj...
    const {firstName, lastName, middleName, dob, heightInInches} = props.agentObj;

    

    return (
        <div className="agent-card">
            <button id="put-right" className="btn btn-outline-danger" onClick={() => props.deleteAgent(props.agentObj.agentId)}>❌</button>
            
            <p><b>First Name:</b>{firstName}</p>
            <p><b>Middle Name:</b>{middleName}</p>
            <p><b>Last Name:</b>{lastName}</p>
            <p><b>dob: </b>{dob}</p>
            <p><b>height: </b>{heightInInches} inches</p>
            <Editform 
            agentObj={props.agentObj}
            agents={props.agents}
            setAgents={props.setAgents}
            />
           
            
            
            
        </div>
      
    )
}

export default Agent;