import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
// import ProductPage from "./pages/ProductPage";
// import Error404 from "./components/error-404/Error404";
// import UserProfile from "./components/user-profile/UserProfile";
// import UpdateUserProfile from "./components/user-profile/UpdateUserProfile";
// import CheckOut from "./pages/CheckOut";
// import Cart from "./components/cart/Cart";

// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";

function App() {
  return (
    // <Router>
    //   <Navbar />
    //   <Switch>
    //     <Route path="/" component={Home} exact />
    //     <Route
    //       path="/products/:id"
    //       component={ProductDetails}
    //       exact
    //     />
    //     <Route path="/product/list" component={ProductPage} exact />
    //     <Route path="/cart" component={Cart} exact />
    //     <Route path="/profile" component={UserProfile} exact />
    //     <Route path="/profile/edit" component={UpdateUserProfile} exact />
    //     <Route path="/checkOut" component={CheckOut} exact />
    //     <Route component={Error404} />
    //   </Switch>
    //   <Footer />
    // </Router>
    <ProductDetails />
  );
}

export default App;
