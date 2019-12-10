import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.scss";

import HeaderLayout from "./components/Header";
import Calendar from "./components/Calendar";

const App = () => {
  const onClickCalendarDate = date => {
    console.log(date);
  };
  return (
    <Router>
      <div className="App">
        <HeaderLayout />
        <Calendar onClick={onClickCalendarDate} />
        {/* <Switch>
          <Route path="/" exact component={Calendar}></Route>
        </Switch> */}
      </div>
    </Router>
  );
};

export default App;
