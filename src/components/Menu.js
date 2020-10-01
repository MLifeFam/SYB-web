import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';
import oc from 'open-color';

const MenuContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-Items:center;
    padding-top:2rem;
`;

const MenuContent = styled.div`
    color:${oc.gray[7]};
    font-weight:bold;
`;

const Spacing = styled.div`
    margin:0.5rem 0;
    height:2rem;
`;



class Menu extends Component{
    render(){
        return(
            <MenuContainer>
                <Link to="/status" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            조교 부재여부
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/curriculum" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            교과과정
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/notice" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            학과공지
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/professor" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            교수님 연구실
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/timetable" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            강의실
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/bestqa" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            자주 묻는 질문
                        </MenuContent>
                    </Spacing>
                </Link>
            </MenuContainer>
        );
    }
  }

export default Menu;
