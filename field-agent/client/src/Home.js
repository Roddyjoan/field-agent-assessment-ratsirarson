
import Agents from "./Agents";
import Welcome from "./Welcome";
import ShowAgents from "./ShowAgents";
import AuthContext from "./AuthContext";
import { useContext } from "react";

function Home() {
    const [user, setUser] = useContext(AuthContext);



    return (
        
      <Welcome />
    )

}

export default Home;