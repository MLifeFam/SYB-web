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
import Question from './Question';
import Professor from './Professor';
import Timetable from './Timetable';
import Bestqa from './Bestqa';
import oc from 'open-color';
import Auth from "../hoc/auth";

const Container = styled.div`
    display:flex;
    position:relative;
    flex-direction:row;
    width:100%;
    height:100%;
    min-width:800px;
    min-height:800px;
    margin-bottom:3rem;
    margin-top:4rem;
    padding-left:1rem;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`;

const MenuBar = styled.div`
  width:12rem;
  height:85%;
  background-color:${oc.gray[1]};
  border-radius:1rem;
  position:fixed;
  z-index:2;
  border:4px groove ${oc.gray[4]};
  "&:hover": {
      background: "#efefef"
    }
  // @media (max-width: 767px) {
  //     display:none;
  // }
`;

const Contents = styled.div`
  width:85%;
  height:85%;
  min-height:600px;
  min-width:800px;
  margin:2rem 2rem 0 13rem;
  border-radius:0.5rem;
  background-color:${oc.gray[1]};
  border:2px groove ${oc.gray[4]};
`;

const MainPage = (props) => {
  const userdata = props.data;
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
                      <Route path="/status" component={Auth(Status)} exact/>
                      <Route path="/question" component={Question} exact/>
                      <Route path="/curriculum" component={Auth(Curriculum)} exact/>
                      <Route path="/notice" component={Auth(Notice)} exact/>
                      <Route path="/professor" component={Auth(Professor)} exact/>
                      <Route path="/timetable" component={Auth(Timetable)} exact/>
                      <Route path="/bestqa" component={Auth(Bestqa)} exact/>
                      <Route path="/main" component={Auth(Welcome)} exact/>
                    </Switch>
                  </Contents>
                </Router>
              </Container>
              {/* <Footer/> */}
          </div>
        );
  }

export default MainPage;