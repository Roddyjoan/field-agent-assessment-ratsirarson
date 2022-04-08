import Editform from "./Editform";
function Agent(props){
    //props.agentObj...
    const {id, firstName, lastName, middleName, dob, heightInInches} = props.agentObj;

    function removeAgentFromState(){
        props.setAgents([...props.agents].filter(agent => agent.id !== id))
    }
    
    function deleteAgent(id){
        console.log(id);
        
        let confirm = window.confirm("Are you sure you wnat to eliminate this agent D:?")

        if(confirm){
        fetch("http://localhost:8080/api/agent/" + id, {
        method: "DELETE",
        })
        .then( response =>{
                removeAgentFromState();
                alert("You eliminated this agent. Cold, dude :( ")
            }
        )
        .catch(
            rejection => alert(rejection)
        )
        
        //then display the list again but without the deleted agent
        // fetch("http://localhost:8080/api/agent")
        // .then(response => response.json())
        // .then(jsonData => setAgents(jsonData))
        // .catch(rejection => () => errorHandler(rejection))

        }else {
             alert("Agent not eliminated :D")
         }
        
    }

    

    return (
        <div className="agent-card">
            <button id="put-right" className="btn btn-danger" onClick={() => deleteAgent(props.agentObj.agentId)}>X</button>
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