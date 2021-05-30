import React, { Component } from "react";
import HomePage from "./components/HomePage";
import CompanyDetail from "./components/CompanyDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        {/* <HomePage /> */}
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/details">
            <CompanyDetail />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;