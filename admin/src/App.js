import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Store from "./pages/Store";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Store} exact />
        <Route path="/admin" component={Admin} exact />
        <Route path="/admin/login" component={Login} exact />
        <Route path="/admin/dashboard" component={Dashboard} exact />
      </Switch>
    </Router>
  );
}

export default App;
