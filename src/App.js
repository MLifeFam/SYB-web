import React, {Component,useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
import Signup from "./pages/Signup"
import './App.css';

class App extends Component {
  render(){
  return (
      <Router>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/signup" component={Signup} exact/>
          <Route path="/main" component={MainPage} exact/>
        </Switch>
      </Router>
  );
  }
}



export default App;
