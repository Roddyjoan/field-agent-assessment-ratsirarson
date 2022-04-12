import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function DeleteAgent(props) {

    const Navigate = useNavigate();

    function handleDelete() {
        var confirm = window.confirm(" You sure you want to delete?")
        if (confirm) {
            console.log(props.agentId)
            fetch("http://localhost:8080/api/agent/" + props.agentId, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(response => {
                    if (response.status === 204) {
                        console.log ( response )
                        alert("Agent Successfully deleted!");
                        console.log(props.agentId);
                        props.removeFromState(props.agentId);
                        Navigate("/agents")
                        // removeFromState();
                    }
                    
                    else {
                        alert("You cannot delete an agent if you are not an Admin!")
                    }
                })
        } else {
            alert("Agent not deleted");
        }
    }

    return <button id="put-right" className="btn btn-danger" onClick={handleDelete}>X</button>
}

export default DeleteAgent;