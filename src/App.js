import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.scss";

import HeaderLayout from "./components/Header";
import Calendar from "./components/Calendar";

const App = () => {
  return (
    <Router>
      <div className="App">
        <HeaderLayout />
        <Switch>
          <Route path="/" exact component={Calendar}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
