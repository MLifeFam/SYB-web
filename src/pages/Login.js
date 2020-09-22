import React , { Component,useState } from 'react';
import { Link, Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = styled.div`
    display:flex;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
`;

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <LoginForm>
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
            Forgot password
            </a>
        </Form.Item>

        <Form.Item>
            <Link to='/main'>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    로그인
                </Button>
            </Link>
            <Link to='/signup'>
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
