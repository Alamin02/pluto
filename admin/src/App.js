import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Spin } from "antd";

import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";

import { agent } from "./helpers/agent";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          if (error) {
            localStorage.removeItem("token");
            setToken(null);
          }

          setUser(data);
        });
  }, [token]);

  if (!token) {
    return <Login />;
  }

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <Navbar email={user.email} />
      <Route path="/" component={Dashboard} />
    </Router>
  );
}

export default App;
