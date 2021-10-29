import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NoRoleRoute({ component: Component, role, ...rest }) {
 
  return (
    <Route
      {...rest}
      render={(props) =>
        role == null ? (
        
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: role === "company" ? "/homeCompany":"/home", state: { from: props.location } }} />
        )
      }
    />
  );
}