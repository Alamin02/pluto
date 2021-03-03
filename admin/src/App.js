import React, { useState } from 'react'
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  // const isLoggedIn = true;
  // if (!isLoggedIn) {
  //   return (
  //     <div>
  //       <Login />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <Router>
  //       <Navbar />
  //       <Route path="/" component={Dashboard} />
  //     </Router>
  //   );
  // }
  const adminUser = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123'
  }
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")

  const login = (details) => {
    console.log(details)
    if (details.name === adminUser.name && details.email === adminUser.email && details.password === adminUser.password) {
      setUser({
        name: details.name,
        email: details.email,
        password: details.password
      })
    } else {
      setError('Do not match')
    }
  }
  return (
    <div>
      {(user.email !== "") ?
        (<Router>
          <Navbar />
          <Route path="/" component={Dashboard} />
        </Router>
        ) :
        (
          <Login login={login} error={error} />
        )}
    </div>
  )
}

export default App;
