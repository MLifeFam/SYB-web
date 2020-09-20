import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Welcome from './Welcome';
import Content2 from './Content2';
import Content1 from './Content1';
import Content3 from './Content3';
import Content4 from './Content4';

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
  height:100%;
  background-color:black;
  position:fixed;
  z-index:2;
`;

const Contents = styled.div`
  width:100%;
  height:100%;
  background-color:lightgray;
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
                <MenuBar>
                  <Menu/>
                </MenuBar>
                <Contents>
                  <Switch>
                    <Route path="/main" component={Welcome} exact/>
                    <Route path="/content1" component={Content1} exact/>
                    <Route path="/content2" component={Content2} exact/>
                    <Route path="/content3" component={Content3} exact/>
                    <Route path="/content4" component={Content4} exact/>
                  </Switch>
                </Contents>
              </Router>
            </Container>
          </>
        );
    }
  }

export default MainPage;
