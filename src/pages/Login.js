import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import './Login.css';

class Login extends Component{
    render(){
        return(
            <div className="container">
                <p>소융봇 로그인페이지</p>
                    <form name="login_form" action="">
                        <p>
                            아이디 
                            <input type="text" name="id"></input>
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
            </div>
        );
    }
  }

export default Login;
