import React , { Component } from 'react';
import styled from 'styled-components';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import oc from 'open-color';

const Logo = styled.div`
    font-size : 1.5rem;
    letter-spacing:3px;
    color:#a31432;
    font-family:'Rajdhani';
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    background:white;
    position: fixed;    
    top: 0px;
    width:100%;
    min-width:800px;
    z-index:3;
`;

const GradientBorder = styled.div`
    height:2px;
    margin:0rem 1rem 0 2rem;
    border-radius:5rem;
    background: linear-gradient(to right, #a31432, #ffcccb);
`;

const HeaderContents = styled.div`
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin:0 2rem;
    padding-right: 3rem;
    padding-left: 1rem;
`;

const Header = ({children}) =>{
        return(
            <Positioner>    
                    <HeaderContents>
                        <Logo>
                            SYB ADMIN
                        </Logo>
                        <Spacer/>
                        {children}
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Logo style={{fontSize:"1rem"}}>Logout</Logo>
                        </Link>
                    </HeaderContents>
                <GradientBorder/>
            </Positioner>
        );
};

export default Header;
