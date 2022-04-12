import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
function Editform() {
   
    const [showForm, setShowForm] = useState(false);
    const [agentToEdit, setAgentToEdit] = useState(null);

    const {id} = useParams();
    const nav = useNavigate();

    useEffect( 
        () => {

            const jwt = localStorage.getItem( "token" );
            if( jwt ){
                
                fetch( "http://localhost:8080/api/agent/" + id,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + jwt
                        }
                    }
                )
                .then( response => {
                    if( response.ok ){
                        return response.json();
                    } else if (response.status === 403){
                        alert("only admins can edit users")
                    }
                    else {
                        console.log( response );
                        alert( "retrieving Agent failed");
                    }
                })
                .then( retrievedAgent => {
                    console.log( retrievedAgent );
                    setAgentToEdit( retrievedAgent );
                })
                .catch( rejection => {
                    console.log( rejection );
                    alert( "something very bad happened...");
                });
            } else {
                nav("/login");
            }
        },
        []
    );

    const navigate=useNavigate();

    const showTheForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    }
    

    function handleMiddleNameChange(event) {
        let copy = {...agentToEdit};
        copy.middleName = event.target.value;
        setAgentToEdit( copy );
    }

    function handleLastNameChange(event) {
        let copy = {...agentToEdit};
        copy.lastName = event.target.value;
        setAgentToEdit( copy );
    }

    function handleFirstNameChange(event) {
   
        let copy = {...agentToEdit};
        copy.firstName = event.target.value;
        setAgentToEdit( copy );
    }




    function handleSubmit(e) {
        e.preventDefault();
       

        fetch("http://localhost:8080/api/agent/" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agentToEdit)
        }).then(
            response => {
                if (response.ok) {
                    alert("Agent Successfully Updated!")
                    navigate("/agents")
                }
                else if (response.status === 403) {
                    alert("Only an Admin can Edit Agents")
                    navigate("/agents")
                }
                else {
                    alert("Please Fill out All required Fields")
                }
            }
        ).catch(
            rejection => alert("should definitely not be seeing this! " + rejection)
        );


    }
  




    return agentToEdit ?
        


            <form onSubmit={handleSubmit}>
          
         
                <div className="edit-form">
                    <h4> <b>Edit this Agent</b></h4>
                    <p>
                        <label htmlFor="first-name">First Name(required):</label>
                        <br />
                        <input onChange={handleFirstNameChange} id="first-name" defaultValue={agentToEdit?.firstName}></input>
                    </p>

                    <p>
                        <label htmlFor="middle-name">Middle Name(optional):</label>
                        <br />
                        <input onChange={handleMiddleNameChange} id="middle-name" defaultValue={agentToEdit.middleName}></input>
                    </p>

                    <p>
                        <label htmlFor="last-name">Last Name(required):</label>
                        <br />
                        <input type={"text"} onChange={handleLastNameChange} id="last-name" defaultValue={agentToEdit.lastName}></input>
                    </p>

         

                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>

            

        </form> : 
        <></>

    


}

export default Editform;

