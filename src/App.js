import React, { Component, useState } from "react";
import {
  Link,
  Route,
  Switch,
  withRouter,
  HashRouter,
  BrowserRouter as Router,
} from "react-router-dom";
import styled from "styled-components";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Signup from "./pages/Signup";
import "./App.css";
import Auth from "./hoc/auth";

const Container = styled.div`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Router basename={`${process.env.PUBLIC_URL}/`}>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/main" component={Auth(MainPage)} exact />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
