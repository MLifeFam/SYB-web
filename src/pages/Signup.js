import React , { Component, useState } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { registerUser } from "../actions/userAction";
import { useDispatch } from "react-redux";
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import oc from 'open-color';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const Container = styled.div`
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
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const Title = styled.div`
    font-size : 3rem;
    color: #a31432;
    font-family:'Rajdhani';
    margin-top:5rem;
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = (props) => {
  const [form] = Form.useForm();
  const [_id,setId] = useState("");
  const [_password,setPassword] = useState("");
  const [_email,setEmail] = useState("");
  const [_name,setName] = useState("");
  const [_phonenum,setPhonenum] = useState("");
  const sejongemail = '@sejong.ac.kr';
  const dispatch = useDispatch();
  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };
  const onPasswordHanlder = (e) => {
      setPassword(e.currentTarget.value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onPhoneHandler = (e) => {
      setPhonenum(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
      let body = {
        email: _email,
        name: _name,
        password: _password,
        userid:_id,
        phoneNumber:_phonenum,
      };
      
      dispatch(registerUser(body)).then((res) => {
        Swal.fire({
          icon: 'success',
          title: '가입 완료',
          showConfirmButton: false,
          width:'20rem',
          timer: 2000
        })
        props.history.push("/");
      }).catch((err) => {
        console.log(err);
     }); 
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmitHandler}
      autoComplete="off"
      scrollToFirstError
    >
    <Container>
      <Whitespace>
      <Title>
        <p>Sign up</p>
      </Title>

      <Form.Item
        style={{width:"20rem", paddingBottom:"1rem"}}
        name="id"
        label="아이디"
        rules={[
          {
            required: true,
            message: '아이디를 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onIdHandler}/>
      </Form.Item>

      <Form.Item
        style={{width:"20rem", paddingBottom:"1rem"}}
        name="password"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: '패스워드를 입력해주세요.',
          },
        ]}
        hasFeedback
      >
        <Input.Password onChange={onPasswordHanlder}/>
      </Form.Item>

      <Form.Item
        style={{width:"20rem", paddingBottom:"1rem"}}
        name="confirm"
        label="비밀번호 확인"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '패스워드를 확인해주세요',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('비밀번호가 일치하지 않습니다!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        style={{width:"20rem", paddingBottom:"1rem"}}
        name="name"
        label="이름"
        rules={[
          {
            required: true,
            message: '이름을 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onNameHandler}/>
      </Form.Item>

      <Form.Item
        style={{width:"20rem", paddingBottom:"1rem"}}
        name="email"
        label="이메일"
        initialValue=""
        hasFeedback
        rules={[
          {
            type: 'email',
            message: '올바른 이메일이 아닙니다',
          },
          {
            required: true,
            message: '이메일을 입력해주세요.',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value.indexOf(sejongemail)===value.length-sejongemail.length || !value) {
                return Promise.resolve();
              }
              return Promise.reject('');
            },
          }),
          
        ]}
      >
        <Input onChange={onEmailHandler} placeholder="abc@sejong.ac.kr"/>
      </Form.Item>

      <Form.Item
        style={{width:"20rem", paddingBottom:"1rem"}}
        name="phonenumber"
        label="휴대폰 번호"
        rules={[
          {
            required: true,
            message: '휴대폰 번호를 입력해주세요.',
          },
        ]}
      >
        <Input onChange={onPhoneHandler}/>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{backgroundColor:"#a31432", border:"none",marginTop:"0.5rem"}}>
              회원가입
          </Button>
      </Form.Item>
      </Whitespace>
      </Container>
    </Form>
  );
};

export default Signup;
