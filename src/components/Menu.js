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
    color:${oc.gray[6]};
    font-size:1rem;
    ':hover':{
        color:"red"
    }
`;

const Spacing = styled.div`
    margin:0.5rem 0;
`;



class Menu extends Component{
    render(){
        return(
            <MenuContainer>
                <Link to="/content1" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            조교 부재여부
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/content2" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            교과과정
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/content3" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            Content3
                        </MenuContent>
                    </Spacing>
                </Link>
                <Link to="/content4" style={{textDecoration: 'none'}}>
                    <Spacing>
                        <MenuContent>
                            Content4
                        </MenuContent>
                    </Spacing>
                </Link>
            </MenuContainer>
        );
    }
  }

export default Menu;
