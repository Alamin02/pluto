import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Error404 from "./components/error-404/Error404";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";

import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";

import Offers from "./pages/Offers";
import ContactUs from "./pages/ContactUs";

import ForgetPasswordPage from "./pages/auth/ForgetPassword";
import LoginPage from "./pages/auth/Login";
import RegistrationPage from "./pages/auth/Registration";
import ResetPasswordPage from "./pages/auth/ResetPassword";

import BlogDetails from "./pages/blog/BlogDetails";
import BlogPage from "./pages/blog/BlogPage";

import Offers from "./pages/offer/Offers";

import Cart from "./pages/order/Cart";
import CheckOut from "./pages/order/CheckOut";

import ProductDetails from "./pages/product/ProductDetails";
import ProductsPage from "./pages/product/ProductsPage";

import UpdateUserProfile from "./pages/user/UpdateUserProfile";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/registration" component={RegistrationPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgetPassword" component={ForgetPasswordPage} exact />
        <Route path="/resetPassword" component={ResetPasswordPage} exact />

        <Route path="/blogs" component={BlogPage} exact />
        <Route path="/blogs/:id" component={BlogDetails} exact />

        <Route path="/offers" component={Offers} />

        <Route path="/cart" component={Cart} exact />
        <Route path="/checkOut" component={CheckOut} exact />

        <Route path="/products" component={ProductsPage} exact />
        <Route path="/products/:id" component={ProductDetails} exact />

        <Route path="/profile" component={UserProfile} exact />
        <Route path="/profile/edit" component={UpdateUserProfile} exact />

        <Route path="/contact" component={ContactUs} />

        <Route component={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
