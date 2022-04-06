import Agents from "./Agents";
import { useState } from "react";
import Addform from "./Addform";

function App() {

  const [agents, setAgents] = useState([]);
  
  return (
    <div className="App">
      <Agents />
      
    </div>
  );
}

export default App;
