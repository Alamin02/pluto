import React from "react";
import { Switch, Route } from "react-router-dom";

import Overview from "./Overview";
import Products from "./product/Products";
import Offers from "./Offers";
import Users from "./user/Users";
import Orders from "./Orders";
import Catagories from "./Catagories";

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
        <Route path="/catagories" component={Catagories} exact />
      </Switch>
    </div>
  );
}
