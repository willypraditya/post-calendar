import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.scss";

import HeaderLayout from "./components/Header";
import Welcome from "./components/Welcome";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <div className="App">
        <HeaderLayout />
        <Switch>
          <Route path="/" exact component={Welcome}></Route>
          <Route path="/about" component={About}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
