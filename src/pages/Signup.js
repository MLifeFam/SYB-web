import React , { Component, useState } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
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

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin:2rem 0;
`;

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

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

const Signup = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
    <Container>
      <Form.Item
        name="email"
        label="이메일"
        rules={[
          {
            type: 'email',
            message: '올바른 이메일이 아닙니다',
          },
          {
            required: true,
            message: '이메일을 입력해주세요.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
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
        <Input.Password />
      </Form.Item>

      <Form.Item
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
        name="name"
        label="이름"
        rules={[
          {
            required: true,
            message: '이름을 입력해주세요.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Link to ='/'>
            <Button type="primary" htmlType="submit">
                회원가입
            </Button>
        </Link>
      </Form.Item>
      </Container>
    </Form>
  );
};

export default Signup;
