import React , { Component } from 'react';
import styled from 'styled-components';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import oc from 'open-color';

const Logo = styled.div`
    font-size : 5rem;
    letter-spacing:3px;
    color:white;
    font-family:'Rajdhani';
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    background-color:${oc.gray[8]};
    position:absolute;
    top:100%;
    width:100%;
    min-width:800px;
    z-index:3;
    opacity:0.2;
`;

const GradientBorder = styled.div`
    height:2px;
    margin:0rem 1rem 0 2rem;
    border-radius:5rem;
    background: linear-gradient(to right, #a31432, #ffcccb);
`;

const HeaderContents = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 3rem;
    padding-left: 1rem;
`;

const Footer = ({children}) =>{
        return(
            <Positioner>    
                    <HeaderContents>
                        <Logo>
                            Footer TEST
                        </Logo>
                        <Spacer/>
                        <Logo>
                            SYB
                        </Logo>
                    </HeaderContents>
            </Positioner>
        );
};

export default Footer;
