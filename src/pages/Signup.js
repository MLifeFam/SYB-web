import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

class Signup extends Component{
    render(){
        return(
            <Container>
                <form>
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
            </Container>
        );
    }
  }

export default Signup;
