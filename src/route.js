import React from "react";
import { Route } from "react-router-dom";

const RouteOptions = (path, exact, component) => {
  return <Route path={path} exact={exact} component={component}></Route>;
};

export default RouteOptions;
