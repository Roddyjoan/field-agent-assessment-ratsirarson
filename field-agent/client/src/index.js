import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import Home from './Home';
import Nav from './Nav';
import Agents from './Agents'
import Addform from './Addform';

ReactDOM.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="agents" element={<Agents />} />
      <Route path="add" element={<Addform />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// Add Agent - AddAgent.js

// List All Agents Page - Agents.js