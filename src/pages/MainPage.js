import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Welcome from './Welcome';
import Curriculum from './Curriculum';
import Status from './Status';
import Notice from './Notice';
import Professor from './Professor';
import Timetable from './Timetable';
import oc from 'open-color';

const Container = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:100%;
    position:absolute;
    margin-top:3rem;
    margin-left:2rem;
`;

const MenuBar = styled.div`
  width:10rem;
  height:80%;
  background-color:${oc.gray[1]};
  border-radius:2rem;
  position:fixed;
  z-index:2;
`;

const Contents = styled.div`
  width:100%;
  height:100%;
  margin-left:12rem;
  margin-right:3rem;
`;

class MainPage extends Component{
    render(){
        return(
          <>
            <header>
              <Header/>
            </header>
            <Container>
              <Router>
                <MenuBar style={{marginTop:"2rem"}}>
                  <Menu/>
                </MenuBar>
                <Contents style={{marginTop:"1rem"}}>
                  <Switch>
                    <Route path="/main" component={Welcome} exact/>
                    <Route path="/status" component={Status} exact/>
                    <Route path="/curriculum" component={Curriculum} exact/>
                    <Route path="/notice" component={Notice} exact/>
                    <Route path="/professor" component={Professor} exact/>
                    <Route path="/timetable" component={Timetable} exact/>
                  </Switch>
                </Contents>
              </Router>
            </Container>
          </>
        );
    }
  }

export default MainPage;
