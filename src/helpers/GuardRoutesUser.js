import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoutesUser({
  component: Component,
  role,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        role == "user" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
