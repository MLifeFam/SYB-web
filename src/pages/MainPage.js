import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer'
import Menu from '../components/Menu';
import Welcome from './Welcome';
import Curriculum from './Curriculum';
import Status from './Status';
import Notice from './Notice';
import Professor from './Professor';
import Timetable from './Timetable';
import Bestqa from './Bestqa';
import oc from 'open-color';

const Container = styled.div`
    display:flex;
    position:fixed;
    flex-direction:row;
    width:100%;
    height:100%;
    min-width:800px;
    min-height:800px;
    margin-top:3rem;
    margin-left:2rem;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`;

const MenuBar = styled.div`
  width:10rem;
  height:80%;
  background-color:${oc.gray[1]};
  border-radius:1rem;
  position:fixed;
  z-index:2;

  "&:hover": {
      background: "#efefef"
    }
`;

const Contents = styled.div`
  width:100%;
  height:80%;
  margin:2rem 3rem 0 12rem;
  border-radius:0.5rem;
  background-color:${oc.gray[1]};
`;

class MainPage extends Component{
    render(){
        return(
          <div>
            <header>
              <Header/>
            </header>
              <Container>
              <Router basename={`${process.env.PUBLIC_URL}/`}>
                  <MenuBar style={{marginTop:"2rem"}}>
                    <Menu/>
                  </MenuBar>
                  <Contents>
                    <Switch>
                      <Route path="/status" component={Status} exact/>
                      <Route path="/curriculum" component={Curriculum} exact/>
                      <Route path="/notice" component={Notice} exact/>
                      <Route path="/professor" component={Professor} exact/>
                      <Route path="/timetable" component={Timetable} exact/>
                      <Route path="/bestqa" component={Bestqa} exact/>
                      <Route path="/main" component={Welcome} exact/>
                    </Switch>
                  </Contents>
                </Router>
              </Container>
              <Footer/>
          </div>
        );
    }
  }

export default MainPage;
