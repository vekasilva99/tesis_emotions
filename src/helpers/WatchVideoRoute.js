import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function WatchVideoRoute({
  component: Component,
  role,
  ...rest
}) {
  const getRoute = (pathname) => {
    const auxPath1 = pathname.substring(7);
    return auxPath1.substring(0, auxPath1.length - 6);
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        role == "user" || localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/watchvideo/" + getRoute(props.location.pathname),
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
