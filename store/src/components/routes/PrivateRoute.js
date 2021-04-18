import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component, ...rest }) {
  const token = useSelector((state) => state.auth.tokenValue);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <div>{React.createElement(component, props)}</div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
