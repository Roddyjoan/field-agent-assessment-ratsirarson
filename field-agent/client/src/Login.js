import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "./AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();




    function submitHandler(event) {
        event.preventDefault()
        fetch("http://localhost:8080/api/authenticate/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()

                } else {
                    alert("Failed to Log-in! Please double-check your username and password");

                }
            })
            .then(tokenContainer => {
                const {jwt_token} = tokenContainer
                console.log( jwt_token )
                localStorage.setItem("token", jwt_token)
                setUser({ user: jwtDecode(jwt_token) })
                navigate("/")
            })
            .catch(rejection => console.log(rejection))
    }

    return (
        <div className="login-form">
        <form onSubmit={submitHandler}>
            <label>Username:</label><br />
            <input onChange={event => setUsername(event.target.value)}></input><br /><br />
            <label>Password:</label><br />
            <input type="password" onChange={event => setPassword(event.target.value)}></input>
            <button type="button" className="btn btn-info" onClick={submitHandler} >Submit</button>
        </form>
        </div>
        
    )
}

export default Login;