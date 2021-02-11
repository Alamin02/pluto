import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductsPage";
import CheckOut from "./pages/CheckOut";
import UserProfile from "./pages/UserProfile";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import Cart from "./pages/Cart";
import Navbar from "./components/navbar/Navbar";
import BlogPage from "./pages/BlogPage";
import Footer from "./components/footer/Footer";
import Error404 from "./components/error-404/Error404";
import RegistrationPage from "./pages/Registration";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/products/list" component={ProductsPage} exact />
        <Route path="/products/:id" component={ProductDetails} exact />
        <Route path="/profile" component={UserProfile} exact />
        <Route path="/profile/edit" component={UpdateUserProfile} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/checkOut" component={CheckOut} exact />
        <Route path="/blogs" component={BlogPage} exact />
        <Route path="/registration" component={RegistrationPage} exact />
        <Route component={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
