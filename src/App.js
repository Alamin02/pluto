import React from "react";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import PageNotFound from "./pages/PageNotFound";
import UserProfile from "./components/user-profile/UserProfile";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/product" component={ProductDetails} exact />
        <Route path="/profile" component={UserProfile} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
