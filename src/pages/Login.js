import React , { Component,useState } from 'react';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser,authUser,loginSuccess } from "../actions/userAction";
import axios from "axios";
import oc from 'open-color';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

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
    
    const onLogin = (e) => {
        localStorage.clear();
        const body = {
          userid:_id,
          password:_password,
        };
        
        dispatch(loginUser(body))
          .then((res) => {
            const accessToken = res.data.token;
            if (res.status === 200) {
                dispatch(loginSuccess(accessToken));
                dispatch(authUser())
                .then((res)=>{
                    if(res){                                // res 추가해서 비동기적으로 실행되게 하기위함 (로그인 됬을 때 username 못불러오는 현상 해결)
                        props.history.push("/main");
                    }
                });
            } 
            else{
                  Swal.fire({
                      icon: 'error',
                      title:'로그인 실패',
                      text: res.data.message,
                      showConfirmButton: true,
                      width:'25rem',
                      timer: 2000,
                  })
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
            onFinish={onLogin}
            autoComplete="off"
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
