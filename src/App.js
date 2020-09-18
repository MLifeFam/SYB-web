import React, {Component,useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
import './App.css';
import './pages/Login.css';

class App extends Component {
  render(){
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/main" component={MainPage} exact/>
        </Switch>
      </Router>
    </div>
  );
  }
}



export default App;
