import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import DeleteAgent from "./DeleteAgent";
import Editform from "./Editform";

function Agent(props){
    //props.agentObj...
    const {id, firstName, lastName, middleName, dob, heightInInches} = props.agentObj;
    const [ user, SetUser] = useContext(AuthContext);

    return (
        <div className="agent-card">
            
            <DeleteAgent 
            agents={props.agents}
            setAgents={props.setAgents}
            agentId={props.agentObj.agentId} 
            removeFromState={props.removeFromState} />
            <h3 className ="top-secret"><u>TOP SECRET</u></h3>
            <br />
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