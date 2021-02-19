import React, { Component, useState,useEffect } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
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
  Modal,
} from "antd";
import { QuestionCircleOutlined, LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import oc from "open-color";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Container = styled.div`
  display: flex;
  min-width: 800px;
  min-height: 600px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #a31432;
  justify-content: center;
  align-items: center;
`;

const Whitespace = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding-bottom: 6rem;
  width: 90%;
  height: 90%;
  border-radius: 2rem;
`;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const Title = styled.div`
  font-size: 3rem;
  color: #a31432;
  font-family: "Rajdhani";
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
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

const Backwards = styled.div`
  font-size: 2.8rem;
  left: 7rem;
  top: 3.5rem;
  color: #a31432;
  position: absolute;
  &:hover {
    color: ${oc.red[8]};
    cursor: pointer;
  }
`;

const Signup = (props) => {
  const [form] = Form.useForm();
  const [emailAuthform] = Form.useForm();
  const [_id, setId] = useState("");
  const [_password, setPassword] = useState("");
  const [_department, setDepartment] = useState("");
  const [_email, setEmail] = useState("");
  const [_name, setName] = useState("");
  const [_phonenum, setPhonenum] = useState("");
  const [id_duplication, checkDup] = useState(false);
  const [email_check, checkEmail] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email_auth, setEmailAuth] = useState(0);
  const [dep,setDep] = useState([]);
  const sejongemail = "@sejong.ac.kr";

  const handleOk = (e) => {
    setVisible(false);
    setEmailAuth("");
  };

  const handleCancel = (e) => {
    setVisible(false);
    setEmailAuth("");
  };

  const dispatch = useDispatch();
  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
    checkDup(false);
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
    checkEmail(false);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onPhoneHandler = (e) => {
    setPhonenum(e.currentTarget.value);
  };

  const loadDep = () => {
    axios
      .get("https://sjswbot.site/dep")
      .then((res) => {
        setDep(res.data.result);
        console.log(dep);
      })
      .catch((error) => {
        console.log("에러발생")
      });
  }

  const onEmailCheckSubmit = (e) => {
    console.log({
      email: _email,
      authNumber: email_auth,
    });
    axios
      .post("https://sjswbot.site/mail/verify", {
        email: _email,
        authNumber: email_auth,
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          handleCancel();
          checkEmail(true);
          Swal.fire({
            icon: "success",
            text: res.data.message,
            showConfirmButton: false,
            width: "20rem",
            timer: 2000,
          });
        } 
        else {
          Swal.fire({
            icon: "warning",
            text: res.data.message,
            showConfirmButton: true,
            width: "25rem",
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "warning",
          text: "인증을 실패 하였습니다.",
          showConfirmButton: true,
          width: "25rem",
          timer: 1500,
        });
      });
  };

  const onEmailCheckHandler = (e) => {
    setEmailAuth(e.currentTarget.value);
    console.log(email_auth);
  };

  const onChangeSelectFunc = React.useCallback((e) => {
    setDepartment(form.getFieldValue("department"));
  }, []);

  const onEmailHadnler = (e) => {
    if (_email.indexOf(sejongemail) !== _email.length - sejongemail.length) {
      return Swal.fire({
        icon: "warning",
        text: "세종대학교 조교 이메일(@sejong.ac.kr) 형식이 아닙니다",
        showConfirmButton: true,
        width: "auto",
      });
    }
    // 세종대 이메일 검사

    setVisible(true);

    axios
      .post("https://sjswbot.site/mail/send", { to: _email })
      .then((res) => {
        if (res.status === 200) {
          console.log({ to: _email });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          text: "이메일이 발송되지 않았습니다.",
          showConfirmButton: true,
          width: "25rem",
          timer: 1500,
        });
      });
  };

  const onDuplicationHadnler = (e) => {
    if (_id.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "아이디를 입력해주세요",
        showConfirmButton: true,
        width: "25rem",
        timer: 1500,
      });

      return;
    }

    axios
      .post("https://sjswbot.site/auth/idCheck", {userid:_id})
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            showConfirmButton: true,
            width: "25rem",
            timer: 1500,
          });

          checkDup(true);
        } else {
          Swal.fire({
            icon: "warning",
            text: res.data.message,
            showConfirmButton: true,
            width: "25rem",
            timer: 1500,
          });

          checkDup(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          text: error.response.data.message,
          showConfirmButton: true,
          width: "25rem",
          timer: 1500,
        });

        checkDup(false);
      });

      checkDup(true);
  };
  const linktoMain = (e) => {
    props.history.push("/");
  };

  const onSubmitHandler = (e) => {

    let body = {
      email: _email,
      username: _name,
      password: _password,
      userid: _id,
      phoneNumber: _phonenum,
      department: _department,
    };

    if (id_duplication === false) {
      Swal.fire({
        icon: "error",
        title: "가입 실패",
        text: "아이디 중복검사를 완료해주세요",
        showConfirmButton: true,
        width: "25rem",
        timer: 2000,
      });

      return;
    }

    if (email_check === false) {
      Swal.fire({
        icon: "error",
        title: "가입 실패",
        text: "이메일 인증을 완료해주세요",
        showConfirmButton: true,
        width: "25rem",
        timer: 2000,
      });

      return;
    }

    dispatch(registerUser(body))
      .then((res) => {
        if (res.status === 409) {
          Swal.fire({
            icon: "error",
            title: "가입 실패",
            text: res.data.result,
            showConfirmButton: true,
            width: "25rem",
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "가입 완료",
            showConfirmButton: false,
            width: "20rem",
            timer: 2000,
          });
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    loadDep();
  },[]);

  return (
    <div>
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
            <Backwards>
              <LeftOutlined onClick={linktoMain} />
            </Backwards>
            <Title>
              <p>Sign up</p>
            </Title>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginLeft: "6rem",
              }}
            >
              <Form.Item
                style={{ width: "20rem", paddingBottom: "1%" }}
                name="id"
                label="아이디"
                rules={[
                  {
                    required: true,
                    message: "아이디를 입력해주세요.",
                  },
                ]}
              >
                <Input onChange={onIdHandler} />
              </Form.Item>
              <Button
                style={{
                  position: "relatvive",
                  width: "5rem",
                  fontSize: "0.7rem",
                  marginLeft: "1rem",
                }}
                onClick={onDuplicationHadnler}
              >
                중복검사
              </Button>
            </div>

            <Form.Item
              style={{ width: "20rem", paddingBottom: "1%" }}
              name="password"
              label="비밀번호"
              rules={[
                {
                  required: true,
                  message: "패스워드를 입력해주세요.",
                },
              ]}
              hasFeedback
            >
              <Input.Password onChange={onPasswordHanlder} />
            </Form.Item>

            <Form.Item
              style={{ width: "20rem", paddingBottom: "1%" }}
              name="confirm"
              label="비밀번호 확인"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "패스워드를 확인해주세요",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("비밀번호가 일치하지 않습니다!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              style={{ width: "20rem", paddingBottom: "1%" }}
              name="name"
              label="이름"
              rules={[
                {
                  required: true,
                  message: "이름을 입력해주세요.",
                },
              ]}
            >
              <Input onChange={onNameHandler} />
            </Form.Item>

            <Form.Item
              style={{ width: "20rem", paddingBottom: "1%" }}
              name="department"
              label="학과"
              rules={[
                {
                  required: true,
                  message: "학과를 선택해주세요",
                },
              ]}
            >
              <Select onChange={onChangeSelectFunc}>
                {dep.map(i => (i.department != "관리자" && i.department != "공통") ? <Option value={i.idx}>{i.department}</Option>:null)}
              </Select>
            </Form.Item>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginLeft: "6rem",
              }}
            >
              <Form.Item
                style={{ width: "20rem", paddingBottom: "1%" }}
                name="email"
                label="이메일"
                initialValue=""
                hasFeedback
                rules={[
                  {
                    type: "email",
                    message: "올바른 이메일이 아닙니다",
                  },
                  {
                    required: true,
                    message: "이메일을 입력해주세요.",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (
                        value.indexOf(sejongemail) ===
                          value.length - sejongemail.length ||
                        !value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject("");
                    },
                  }),
                ]}
              >
                <Input
                  onChange={onEmailHandler}
                  placeholder="abc@sejong.ac.kr"
                />
              </Form.Item>
              <Button
                style={{
                  position: "relatvive",
                  width: "5rem",
                  fontSize: "0.7rem",
                  marginLeft: "1rem",
                }}
                onClick={onEmailHadnler}
              >
                메일인증
              </Button>
            </div>

            <Form.Item
              style={{ width: "20rem", paddingBottom: "1%" }}
              name="phonenumber"
              label="휴대폰 번호"
              rules={[
                {
                  required: true,
                  message: "휴대폰 번호를 입력해주세요.",
                },
              ]}
            >
              <Input onChange={onPhoneHandler} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#a31432",
                  border: "none",
                  margin: "0.5rem 1rem 0",
                }}
              >
                회원가입
              </Button>
            </Form.Item>
          </Whitespace>
        </Container>
      </Form>

      <Modal
        title="이메일 인증"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[null, null]} //ok와 cancel 버튼을 없애기 위함
        width="40rem"
      >
        <Form
          form={emailAuthform}
          name="emailCheck"
          onFinish={onEmailCheckSubmit}
          autoComplete="off"
          style={{ width: "auto" }}
        >
          <Form.Item
            style={{ width: "auto" }}
            hasFeedback
            rules={[
              {
                required: true,
                message: "인증번호를 입력해주세요.",
              },
            ]}
          >
            <p>{_email}로 인증번호를 보냈습니다.</p>

            <Input
              onChange={onEmailCheckHandler}
              placeholder="인증번호를 입력해주세요"
            />
          </Form.Item>
          <Form.Item colon={false} wrapperCol={{ offset: 11 }}>
            <Button htmlType="submit">인증하기</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Signup;
