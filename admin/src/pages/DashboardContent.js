import React from "react";
import { Switch, Route } from "react-router-dom";

import Overview from "./Overview";
import Products from "./products/Products";
import Offers from "./offers/Offers";
import Users from "./user/Users";
import Orders from "./Orders";
import Categories from "./category/Catagories";
import Blogs from "./blogs/Blogs";

export default function DashboardContent() {
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
      </Switch>
    </div>
  );
}
