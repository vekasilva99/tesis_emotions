import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoutesAdmin({ component: Component, role, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        role == "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
        )
      }
    />
  );
}