import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import './Login.css';

class Signup extends Component{
    render(){
        return(
            <form className="container">
                <p>회원가입</p>
                <p>
                    아이디
                    <input type="text"></input>
                </p>
                <p>
                    이름
                    <input type="text"></input>
                </p>
                <p>
                    비밀번호
                    <input type="password"></input>
                </p>
                <Link to ="/">
                    <button>확인</button>
                </Link>
            </form>
        );
    }
  }

export default Signup;
