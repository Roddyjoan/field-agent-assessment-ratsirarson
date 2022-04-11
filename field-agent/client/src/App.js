import { useState } from 'react';
import { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Agents from './Agents';
import Addform from './Addform';

function App() {

  const [agents, setAgents] = useState([]);
  const [userStatus, setUserStatus] = useState({
    user: null,
    login(username) {
      // Use previous state to preserve login and logout methods when updating user
      setUserStatus((prev) => ({ ...prev, user: username }));
    },
    logout() {
      // "token" must match the name used in "/Login" route
      localStorage.removeItem("token");
      setUserStatus((prev) => ({ ...prev, user: null }));
    },
  });

  return (
    <AuthContext.Provider value={[userStatus, setUserStatus]}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/add" element={<Addform />} />
  
          {/* <Link to="agents">Show All Agents</Link>
        <Link to="add">Add New Agent</Link> */}
        </Routes>


      </div>
    </AuthContext.Provider>
  );
}

export default App;
