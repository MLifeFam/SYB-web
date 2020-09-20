import React , { Component,useState } from 'react';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

class Login extends Component{
    render(){
        return(
            <Container>
                <p>소융봇 로그인페이지</p>
                    <form name="login_form" action="">
                        <p>
                            아이디 
                            <input 
                                type="text"
                             />
                        </p>
                        <p>
                            비밀번호 
                            <input type="password"></input>
                        </p>
                        <Link to="/main">
                          <button style={{}}>로그인</button>
                        </Link>
                        <Link to="/signup">
                          <button style={{}}>회원가입</button>
                        </Link>
                    </form>
            </Container>
        );
    }
  }

export default Login;
