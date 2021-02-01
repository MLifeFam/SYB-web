import React, { useEffect } from "react";
import { Form, Select, Input, Button, Row, Col,notification, Divider, Modal} from "antd";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import { FormInstance } from "antd/lib/form";
import {
  CloudUploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const openNotification = (type,comment) => {
  notification[type]({
    description: comment,
    placement: "bottomRight",
    duration: 1.5,
    width: "auto",
  });
};

const Option = Select.Option;
const category = ["일반","학사","입학","학과행사","공모전","경시대회","교내모집","장학","기타"];

const QuestionList = ({ data, getData, setPage, page,
  count,pageSize }) => {
  console.log(data);
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [dep,setDep] = React.useState([]);
  const token = localStorage.getItem("user_token");
  const header = {
    headers: {
      authorization: `${token}`,
    },
  };

  const loadDep = () => {
    axios
      .get("https://sjswbot.site/dep")
      .then((res) => {
        setDep(res.data.result);
      })
      .catch((error) => {
        console.log("에러발생")
      });
  }
  
  const FormHandler = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const confirmFunc = (formData) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteFunc(formData);
      }
    });
  };

  const onDeleteFunc = async (formData) => {
    const response = await axios
      .delete(`https://sjswbot.site/knowledgePlus/${data.faqno}`, header, { withReactContent : true })
      .catch((error) => {
        console.log(error);
        return openNotification('error', '서버와의 에러가 발생했습니다.');
      });
    setVisible(false);
    setPage(page);
    getData();
    return openNotification('success', '질문을 삭제했습니다!');
  };

  const onChangeFunc = async (formData) => {
    // 공백 문자처리
    for (const [key, value] of Object.entries(formData)) {
      if (value === undefined || value === null || value === NaN) {
        formData[key] = "";
      }
    }
    console.log(formData);
    const response = await axios
      .put(`https://sjswbot.site/knowledgePlus/${data.faqno}`, formData, header, { withReactContent : true })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          setVisible(false);
          setPage(0);
          getData();
          return openNotification('success', '질문을 수정했습니다!');
        } else {
          return openNotification('error', '서버와의 에러가 발생했습니다.');
        }
      })
      .catch((error) => {
        return openNotification('error', '서버와의 에러가 발생했습니다.');
      });
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  useEffect(() => {
    console.log(data);
    form.setFieldsValue({
      faqno: data.faqno,
      category1: data.category1,
      category2: data.category2,
      category3: data.category3,
      category4: data.category4,
      category5: data.category5,
      question: data.question,
      questionAnswer: data.questionAnswer,
      landingUrl: data.landingUrl,
      imageinfo: data.imageinfo,
    });
  },[form]);

  return (
    <>
      <Divider style={{ margin: "1vh 0" }} />
      <Row
        justify="start"
        style={{
          width: "90%",
          border: "1px solid lightgray",
          padding: "0.8rem 0",
          margin: "0.1rem 1rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        <Col
          flex={1}
          style={{ paddingLeft: "2rem", width: "5%", fontWeight: "bold" }}
        >
          {count}
        </Col>
        <Col flex={8} style={{ paddingLeft: "2rem", width: "60%" }}>
          {data.question}
        </Col>
        <Col flex={2} style={{ width: "15%" }}>
          {moment(data.updatedAt).format("LLL")}
        </Col>
        <Col flex={1}>
          <Button onClick={FormHandler}>수정하기</Button>
          <Modal
            title="질문수정"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[null, null]} //ok와 cancel 버튼을 없애기 위함
            width="40rem"
          >
            <Form
              form={form}
              onFinish={onChangeFunc}
              onFieldsChange={onValuesChange}
              autoComplete="off"
              style={{ width: "95%", padding: "0 5%" }}
            >
              <Form.Item
                label="질문"
                name="question"
                rules={[
                  {
                    required: true,
                    message: "질문을 입력해주세요",
                  },
                ]}
                required
              >
                <Input initialvalues={data.question} />
              </Form.Item>
              <Form.Item
                label="답변"
                name="questionAnswer"
                rules={[
                  {
                    required: true,
                    message: "답변을 입력해주세요",
                  },
                ]}
                required
              >
                <Input.TextArea 
                  initialvalues={data.questionAnswer} 
                  style={{height:"10rem", resize:"none"}}
                />
              </Form.Item>
              <Form.Item
                label="학과"
                name="category1"
                rules={[
                  {
                    required: true,
                    message: "학과를 설정해주세요",
                  },
                ]}
                required
              >
                <Select>
                    {dep.map(i => (i.department != "관리자") ? <Option value={i.department}>{i.department}</Option>:null)}
                </Select>
              </Form.Item>
              <Form.Item 
                label="대분류" 
                name="category2"
                rules={[
                  {
                    required: true,
                    message: "대분류를 설정해주세요",
                  },
                ]}
                required
                >
                  <Select>
                      {category.map(i => <Option value={i}>{i}</Option>)}
                  </Select>
              </Form.Item>
              <Form.Item label="카테고리 1" name="category3">
                <Input initialvalues={data.category3} />
              </Form.Item>
              <Form.Item label="카테고리 2" name="category4">
                <Input initialvalues={data.category4} />
              </Form.Item>
              <Form.Item label="카테고리 3" name="category5">
                <Input initialvalues={data.category5} />
              </Form.Item>
              <Form.Item label="답변링크" name="landingUrl">
                <Input initialvalues={data.landingUrl} />
              </Form.Item>
              <Form.Item label="이미지링크" name="imageinfo">
                <Input initialvalues={data.imageinfo} />
              </Form.Item>
              <Divider />
              <p style={{ width: "100%", color: "gray" }}>
                {data.User.username} 조교님
                <br />({moment(data.updatedAt).format("LLL")})
              </p>
              <Form.Item colon={false} wrapperCol={{ span: 20, offset: 7 }}>
                <Button icon={<CloudUploadOutlined />} htmlType="submit">
                  수정하기
                </Button>
                <Button
                  icon={<ExclamationCircleOutlined />}
                  type="primary"
                  onClick={confirmFunc}
                  style={{
                    backgroundColor: "RGB(255,0,0,0.6)",
                    color: "white",
                    border: "none",
                    marginLeft: "3rem",
                  }}
                >
                  삭제하기
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default QuestionList;
