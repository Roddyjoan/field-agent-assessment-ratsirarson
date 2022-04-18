import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Agents from './Agents';
import Addform from './Addform';
import Editform from './Editform';
import NotFound from './NotFound';
import jwtDecode from "jwt-decode";
import Example from './Example';


function App() {

  const [agents, setAgents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect( () => {
    const jwt_token = localStorage.getItem("token");
    if( jwt_token ){
      setUser({ user: jwtDecode(jwt_token) });
    }
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/add" element={<Addform />} />
          <Route path="agents/edit/:id" element={<Editform />} />
          <Route path="agents/edit" element={<Editform />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/example/:id" element ={<Example />} />
        </Routes>


      </div>
    </AuthContext.Provider>
  );
}

export default App;
