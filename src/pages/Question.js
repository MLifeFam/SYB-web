import React from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Modal,
  Pagination,
  Image,
  Carousel,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from "antd/lib/form";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import QuestionList from "./QuestionList";

const Option = Select.Option;
const { TextArea } = Input;

const Question = (props) => {
  const pageSize = parseInt(window.innerHeight / 100);
  // 한 페이지에 담을 데이터 수 (height에 따라 개수 다르게 설정)
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const num = data[0];
  const FormHandler = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const PageRefresh = (num) => {
    const _data = data.slice(
      (num - 1) * pageSize,
      (num - 1) * pageSize + pageSize
    );
    // data page에 따라 자르는 작업

    window.scrollTo({ top: 0, behavior: "smooth" });
    // data 새로 불러올시 맨 위로 스크롤

    return _data.map((it, i) => {
      it.count = data.length - i - pageSize * (page - 1);
      // 게시글 번호 계산

      it.props = props;
      return (
        <QuestionList
          key={i}
          data={it}
          getData={getData}
          setPage={setPage}
          page={page}
        />
      );
    });
  };

  const onFinishFunc = async (formData) => {
    // 공백 문자처리
    for (const [key, value] of Object.entries(formData)) {
      if (value === undefined || value === null || value === NaN) {
        formData[key] = "";
      }
    }

    const response = await axios
      .post(`https://mfam.site/knowledgePlus`, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("질문을 등록했습니다!");
          setPage(1);
          getData();
          setVisible(false);
        }
      })
      .catch((error) => {
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const onPageChange = (pagenum) => {
    //pagenum은 1,2,3,4 식으로 전송 됨.
    setPage(pagenum);
    getData();
  };

  const getData = React.useCallback(async () => {
    const response = await axios.get(`https://mfam.site/knowledgePlus`);
    setData(response.data.reverse());
    //setData(response.data.values.reverse());
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        margin: "3% 10%",
        padding: "1% 0%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
        borderRadius: "0.5rem",
        border: "2px solid lightgray",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily: "Gothic A1",
        }}
      >
        <p>질문 수정 페이지</p>
      </div>
      소융봇에서 제공 할 질문과 답변을 관리하는 페이지입니다.
      <div style={{ display: "flex", flexDirection: "row", margin: "5px 0" }}>
        <Link to="/userquestion">
          <u>유저들의 질문</u>
        </Link>{" "}
        에서 질문을 골라보세요 😊
      </div>
      {PageRefresh(page)}
      <div style={{ marginBottom: "2rem" }} />
      <Pagination
        current={page}
        total={data.length}
        defaultPageSize={pageSize}
        onChange={onPageChange}
        style={{ marginBottom: "1.5rem" }}
      />
      <Button onClick={FormHandler}>질문 추가</Button>
      <Modal
        title="질문추가"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[null, null]} //ok와 cancel 버튼을 없애기 위함
        width="40rem"
      >
        <Form
          form={form}
          onFinish={onFinishFunc}
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
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item
            label="카테고리 1"
            name="category1"
            rules={[
              {
                required: true,
                message: "하나 이상의 카테고리를 설정해주세요",
              },
            ]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item label="카테고리 2" name="category2">
            <Input />
          </Form.Item>
          <Form.Item label="카테고리 3" name="category3">
            <Input />
          </Form.Item>
          <Form.Item label="카테고리 4" name="category4">
            <Input />
          </Form.Item>
          <Form.Item label="카테고리 5" name="category5">
            <Input />
          </Form.Item>
          <Form.Item label="답변링크" name="landingUrl">
            <Input />
          </Form.Item>
          <Form.Item label="이미지링크" name="imageinfo">
            <Input />
          </Form.Item>
          <Form.Item colon={false} wrapperCol={{ offset: 11 }}>
            <Button
              icon={<CloudUploadOutlined />}
              htmlType="submit"
              style={{ margin: "1rem 1rem 0 1rem" }}
            >
              추가하기
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Question;
