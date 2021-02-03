import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import ProductPage from "./pages/ProductPage";
import Error404 from "./components/error-404/Error404";
import UserProfile from "./components/user-profile/UserProfile";
import UpdateUserProfile from "./components/user-profile/UpdateUserProfile"
import CheckOut from "./pages/CheckOut";

import Navbar from "./components/navbar/Navbar";
import ProductList from "./components/product/ProductList";
import Footer from "./components/footer/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/product" component={ProductDetails} exact />
        <Route path="/product/list" component={ProductPage} exact />
        <Route path="/profile" component={UserProfile} />
        <Route path="/update-profile" component={UpdateUserProfile} />
        <Route component={Error404} />
        <Route path="/checkOut" component={CheckOut} exact />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
