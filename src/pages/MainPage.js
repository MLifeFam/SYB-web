import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"

class MainPage extends Component{
    render(){
        return(
            <center>
              <p>MainPage</p>
              <Link to="/">
                <button>로그아웃</button>
              </Link>
            </center>
        );
    }
  }

export default MainPage;
