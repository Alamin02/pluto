import React from "react";
import { Switch, Route } from "react-router-dom";

import Overview from "../overview/Overview";
import Products from "../products/Products";
import Offers from "../offers/Offers";
import Users from "../users/Users";
import Orders from "../orders/Orders";
import Categories from "../categories/Catagories";
import Blogs from "../blogs/Blogs";
import Addresses from "../addresses/Addresses";
import Carousel from "../carousel/Carousel";
import FeaturedProducts from "../featured-products/FeaturedProducts";
import Settings from "../settings/Settings";

export default function DashboardRoutes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Overview />
        </Route>
        <Route path="/products" component={Products} exact />
        <Route path="/offers" component={Offers} exact />
        <Route path="/users" component={Users} exact />
        <Route path="/orders" component={Orders} exact />
        <Route path="/Categories" component={Categories} exact />
        <Route path="/blogs" component={Blogs} exact />
        <Route path="/addresses" component={Addresses} exact />
        <Route path="/carousel" component={Carousel} exact />
        <Route path="/featured-products" component={FeaturedProducts} exact />
        <Route path="/settings" component={Settings} exact />
      </Switch>
    </div>
  );
}
