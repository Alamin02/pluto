import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import PrivateRoute from "./components/routes/PrivateRoute";

import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ContactUs from "./pages/ContactUs";
import Error404 from "./pages/error-404/Error404";

import ForgetPasswordPage from "./pages/auth/ForgetPassword";
import LoginPage from "./pages/auth/Login";
import RegistrationPage from "./pages/auth/Registration";
import ResetPasswordPage from "./pages/auth/ResetPassword";

import Blog from "./pages/blog/Blog";
import Blogs from "./pages/blog/Blogs";

import CategoryProducts from "./pages/product/CategoryProducts";

import Offers from "./pages/offer/Offers";
import Offer from "./pages/offer/Offer";

import Cart from "./pages/order/Cart";
import CheckOut from "./pages/order/CheckOut";

import Product from "./pages/product/Product";
import Products from "./pages/product/Products";

import UpdateUserProfile from "./pages/user/UpdateUserProfile";
import UserProfile from "./pages/user/UserProfile";
import ScrollToTop from "./components/ScrollToTop";
import { getSettings } from "./client/settings.client";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getSettings()
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({
          type: "settings/update",
          payload: data,
        });
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} exact />

        <Route path="/registration" component={RegistrationPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgetPassword" component={ForgetPasswordPage} exact />
        <Route path="/resetPassword" component={ResetPasswordPage} exact />

        <Route path="/blogs" component={Blogs} exact />
        <Route path="/blogs/:id" component={Blog} exact />

        <Route path="/category/:id" component={CategoryProducts} exact />

        <Route path="/offers" component={Offers} exact />
        <Route path="/offers/:id" component={Offer} exact />

        <Route path="/cart" component={Cart} exact />
        <PrivateRoute path="/checkout" component={CheckOut} exact />

        <Route path="/products" component={Products} exact />
        <Route path="/products/:id" component={Product} exact />

        <Route path="/profile" component={UserProfile} exact />
        <Route path="/profile/edit" component={UpdateUserProfile} exact />

        <Route path="/contact" component={ContactUs} exact />

        <Route component={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
