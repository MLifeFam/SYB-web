import React , { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch, withRouter, BrowserRouter as Router } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";
import oc from 'open-color';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);
const Logo = styled.div`
    font-size : 2rem;
    letter-spacing:15px;
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
    margin:0.5rem 0;
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

function Header(props) {
    const dispatch = useDispatch();
    const onClickHandler = () => {

        dispatch(logoutUser())
        .then((res)=>{
            console.log(res.status);
            if (res.status === 404) {   
                props.history.push("/");
              } 
              else if(res.status){
                  Swal.fire({
                      icon: 'error',
                      title:'로그아웃 실패',
                      text: res.data.message,
                      showConfirmButton: true,
                      width:'25rem',
                      timer: 2000,
                  })
              }
            })
        .catch((err)=> console.log(err));
    };
        return(
            <Positioner>    
                    <HeaderContents>
                        <Logo>
                            SYB ADMIN
                        </Logo>
                        <Spacer/>
                        <Logo style={{fontSize:"1rem", letterSpacing:"3px"}} onClick={onClickHandler}>Logout</Logo>
                    </HeaderContents>
                <GradientBorder/>
            </Positioner>
        );
};

export default withRouter(Header);  // withRouter 해야 'push'를 못찾는 에러 메세지 뜨지 않음
