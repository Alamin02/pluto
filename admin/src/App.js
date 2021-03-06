import React from 'react'
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    return (
      <div>
        <Login />
      </div>
    );
  } else {
    return (
      <Router>
        <Navbar />
        <Route path="/" component={Dashboard} />
      </Router>
    );
  }
}

export default App;
