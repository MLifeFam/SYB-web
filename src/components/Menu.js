import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';

const MenuContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-Items:center;
    font-family:'Rajdhani';
    letter-spacing:3px;
    padding-top:2rem;
`;

class Menu extends Component{
    render(){
        return(
            <MenuContainer>
                <Link to="/content1" style={{textDecoration: 'none'}}><p style={{color:"white"}}>Content1</p></Link>
                <Link to="/content2" style={{textDecoration: 'none'}}><p style={{color:"white"}}>Content2</p></Link>
                <Link to="/content3" style={{textDecoration: 'none'}}><p style={{color:"white"}}>Content3</p></Link>
                <Link to="/content4" style={{textDecoration: 'none'}}><p style={{color:"white"}}>Content4</p></Link>
            </MenuContainer>
        );
    }
  }

export default Menu;
