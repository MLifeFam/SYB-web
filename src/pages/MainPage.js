import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Content2 from './Content2';
import Content1 from './Content1';
import Content3 from './Content3';
import Content4 from './Content4';
import Welcome from './Welcome';

class MainPage extends Component{
    render(){
        return(
            <center>
              <p>MainPage</p>
              <Router>
                <div>
                  <Link to="/content1">Content 1</Link>
                  <Link to="/content2">Content 2</Link>
                  <Link to="/content3">Content3</Link>
                  <Link to="/content4">Content 4</Link>
                </div>
                <Route path="/main" component={Welcome} exact/>
                <Route path="/content1" component={Content1} exact/>
                <Route path="/content2" component={Content2} exact/>
                <Route path="/content3" component={Content3} exact/>
                <Route path="/content4" component={Content4} exact/>                
              </Router>

              <Link to="/">
                <br></br>
                <button>로그아웃</button>
              </Link>
            </center>
        );
    }
  }

export default MainPage;
