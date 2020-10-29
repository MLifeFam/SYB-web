import React , { Component,useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch, withRouter, BrowserRouter as Router } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logoutUser,authUser} from "../actions/userAction";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Button} from 'antd';
import oc from 'open-color';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);
const Logo = styled.div`
    font-size : 2.5rem;
    letter-spacing:15px;
    color:white;
    font-family:'Rajdhani';
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    background:#a31432;
    position: fixed;    
    top: 0px;
    width:100%;
    min-width:800px;
    z-index:3;
`;

const Logout = styled.div`
    font-size : 1.2rem;
    letter-spacing:3px;
    color:black;
    font-family:'Rajdhani';
    &:hover {
        color: ${oc.gray[6]};
        cursor: pointer;
      }
`;

const GradientBorder = styled.div`
    height:10   px;
    background: linear-gradient(to right, black, white);
`;

const UserContainer = styled.div`
    background-color:white;
    padding:0 2rem;
    height:70%;
    display:flex;
    flex-direction:row;
    align-items:center;
    border-radius:55px;
    border:3px solid ${oc.red[8]};
`;

const HeaderContents = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin:0 2rem;
    padding-right: 3rem;
    padding-left: 1rem;
`;

function Header(props) {
    const dispatch = useDispatch();
    const username = localStorage.getItem('username')
    const dept = localStorage.getItem('department');
    const onClickHandler = () => {

        dispatch(logoutUser());
        localStorage.clear();
        props.history.push("/");
    };
        return(
            <Positioner>    
                    <HeaderContents>
                        <Logo>
                            SYB ADMIN
                        </Logo>
                        <Spacer/>
                        <UserContainer>
                            <Logo style={{fontSize:"1.2rem",letterSpacing:"1px",paddingRight:"3rem",fontFamily:"Gothic A1",color:"black"}}>
                            <UserOutlined style={{color:"white", padding:"5px",fontSize:"1.5rem", marginRight:"1rem",borderRadius:"100%",backgroundColor:"gray"}}/>    
                            {dept}&emsp;
                            {username} 조교님
                            </Logo>
                            <Logout onClick={onClickHandler}>Logout</Logout>
                        </UserContainer>
                    </HeaderContents>
                <GradientBorder/>
            </Positioner>
        );
};

export default withRouter(Header);  // withRouter 해야 'push'를 못찾는 에러 메세지 뜨지 않음
