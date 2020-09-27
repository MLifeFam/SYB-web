import React , { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import oc from 'open-color';

const Logo = styled.div`
    font-size : 1.5rem;
    letter-spacing:3px;
    color: ${oc.red[9]};
    font-family:'Rajdhani';
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Positioner = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0px;
    width: 100%;
    margin:0 2rem 0 2rem;
    z-index:3;
`;

const GradientBorder = styled.div`
    height: 3rem;
    background: linear-gradient(to right, ${oc.gray[3]}, ${oc.gray[1]});
`;

const WhiteBackground = styled.div`
    background: white;
    width:100%;
    display: flex;
    height: auto;
`;

const HeaderContents = styled.div`
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 3rem;
    padding-left: 1rem;
`;

const Header = ({children}) =>{
        return(
            <Positioner>    
                <WhiteBackground>
                    <HeaderContents>
                        <Link to="/main" style={{textDecoration: 'none'}}>
                            <Logo>
                                SYB ADMIN
                            </Logo>
                        </Link>
                        <Spacer/>
                        {children}
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Logo style={{fontSize:"1rem"}}>Logout</Logo>
                        </Link>
                    </HeaderContents>
                </WhiteBackground>
                <GradientBorder/>
            </Positioner>
        );
};

export default Header;
