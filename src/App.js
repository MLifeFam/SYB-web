import React, {Component,useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
import Signup from "./pages/Signup"
import './App.css';
import './pages/Login.css';

class App extends Component {
  render(){
  return (
    <div style={{width:"100%", height:"100%", padding:"5% 0 10% 0"}}>
      <Router>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/signup" component={Signup} exact/>
          <Route path="/main" component={MainPage} exact/>
        </Switch>
      </Router>
    </div>
  );
  }
}



export default App;
