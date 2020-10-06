import React , { Component,useState } from 'react';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from "../actions/userAction";
import oc from 'open-color';

const LoginForm = styled.div`
    display:flex;
    min-width:800px;
    min-height:600px;
    position:absolute;
    width:100%;
    height:100%;
    background-color:#a31432;
    justify-content:center;
    align-items:center;
`;

const Logo = styled.div`
    font-size : 6rem;
    letter-spacing:1rem;
    color: #a31432;
    font-family:'Rajdhani';
`;

const Whitespace = styled.div`
  display:flex;
  flex-direction:column;
  background-color:white;
  justify-content:center;
  align-items:center;
  padding-bottom:6rem;
  width:90%;
  height:90%;
  border-radius:2rem;
`

const Login = (props) => {
    const [_id,setId] = useState("");
    const [_password,setPassword] = useState("");
    const dispatch = useDispatch();
    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
      };
    const onPasswordHanlder = (e) => {
        setPassword(e.currentTarget.value);
    };
    
    const onSubmitHandler = (e) => {

        const body = {
          userid:_id,
          password:_password,
        };
        console.log(body);
        dispatch(loginUser(body))
          .then((res) => {
            console.log(res);
            if (res.payload.loginSuccess) {
              props.history.push("/main");
            } else {
              alert(res.payload.message);
            }
          })
          .catch((err) => {
              console.log(err);
          });
      };

  return (
    <LoginForm>
        <Whitespace>
            <Logo style={{marginBottom:"3%"}}>
                SYB ADMIN
            </Logo>
            <Form
            name="normal_login"
            className="login-form"
            onFinish={onSubmitHandler}
            >
            <Form.Item
                name="id"
                rules={[
                {
                    required: true,
                    message: 'ID를 입력해주세요',
                },
                ]}
                style={{paddingBottom:"0.5rem"}}
            >
                <Input 
                prefix={<UserOutlined className="site-form-item-icon"/>}
                onChange={onIdHandler}
                placeholder="아이디" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: '비밀번호를 입력해주세요',
                },
                ]}
                style={{paddingBottom:"1rem"}}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="비밀번호"
                onChange={onPasswordHanlder}
                />
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{backgroundColor:"#a31432", border:"none", margin:"0 1rem"}}>
                   로그인
                </Button>
                <Link to='/signup' style={{margin:"0 1rem"}}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor:"#a31432", border:"none"}}>
                        회원가입
                    </Button>
                </Link>
            </Form.Item>
            </Form>
        </Whitespace>
    </LoginForm>
  );
};

export default Login;
