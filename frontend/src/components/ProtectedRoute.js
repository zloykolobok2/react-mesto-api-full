import React from "react";
import { Route, Redirect } from "react-router-dom";
import {LINKS} from "../utils/utils";


const ProtectedRoute = ({ component: Component, exact, ...props }) => {
  return (
    <Route exact={exact}>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to={LINKS.login} />
      }
    </Route>
  );
};

export default ProtectedRoute;