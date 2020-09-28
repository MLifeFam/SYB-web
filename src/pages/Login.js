import React , { Component,useState } from 'react';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import oc from 'open-color';

const LoginForm = styled.div`
    display:flex;
    flex-direction:column;
    position:absolute;
    min-width:800px;
    min-height:500px;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
    padding-bottom:6rem;
`;

const Logo = styled.div`
    font-size : 6rem;
    letter-spacing:1rem;
    color: #a31432;
    font-family:'Rajdhani';
`;

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <LoginForm>
        <Logo style={{marginBottom:"3%"}}>
            SYB ADMIN
        </Logo>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        >
        <Form.Item
            name="ID"
            rules={[
            {
                required: true,
                message: 'ID를 입력해주세요',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" />
        </Form.Item>
        <Form.Item
            name="비밀번호"
            rules={[
            {
                required: true,
                message: '비밀번호를 입력해주세요',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
            />
        </Form.Item>

        <Form.Item>
            <Link to='/main' style={{margin:"0 1rem"}}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    로그인
                </Button>
            </Link>
            <Link to='/signup' style={{margin:"0 1rem"}}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    회원가입
                </Button>
            </Link>
        </Form.Item>
        </Form>
    </LoginForm>
  );
};

export default Login;
