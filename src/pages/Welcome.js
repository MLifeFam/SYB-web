import React from "react";
import moment from "moment";
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from "antd/lib/form";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Option = Select.Option;
const { TextArea } = Input;

const Welcome = (props) => {
  const name = localStorage.getItem("username");
  const department = localStorage.getItem("department");
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);

  const confirmFunc = (formData) => {
    Swal.fire({
      title: "수정하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        onFinishFunc(formData);
      }
    });
  };

  const FormHandler = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const CancleModify = () => {
    setVisible(false);
  };

  const onFinishFunc = async (formData) => {
    const token = localStorage.getItem("user_token");
    const header = {
      headers: {
        authorization: `${token}`,
      },
    };
    
    // 공백 문자처리
    for (const [key, value] of Object.entries(formData)) {
      if (value === undefined || value === null || value === NaN) {
        formData[key] = "";
      }
    }
    formData.modifier = name;
    const response = await axios
      .put(`https://sjswbot.site/assistantNotice/${department}`, formData,header,{ widthCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "수정 완료",
            showConfirmButton: false,
            width: "20rem",
            timer: 1500,
          });
          getData();
          setVisible(false);
        } else {
          toast.error("서버와의 에러가 발생했습니다!");
        }
      })
      .catch((err) => {
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };

  const loadContent = () => {
    if (visible === true) {
      return (
        <Form
          form={form}
          onFinish={confirmFunc}
          onFieldsChange={onValuesChange}
          autoComplete="off"
        >
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "내용을 입력해주세요",
              },
            ]}
            required
          >
            {/* <TextArea
              style={{
                fontSize: "1rem",
                width: "50rem",
                resize: "none",
                padding: "1rem",
                textAlign: "center",
              }}
              autoSize={true}
              resize="none"
            /> */}
            <ReactQuill theme="snow" value={data.content} style={{width:"50rem",height:"auto"}}/>
          </Form.Item>
          <div style={{ marginBottom: "1rem" }} />
          <Divider />
          <p style={{ width: "100%", color: "gray", marginBottom: "2rem" }}>
            수정 하시려면 수정하기 버튼을, 취소하려면 취소 버튼을 눌러주세요{" "}
          </p>
          <Form.Item >
            <div style={{ display: "inline-block" ,float:"right"}}>
              <Button htmlType="submit" style={{ margin: "0 1rem" }}>
                수정하기
              </Button>
              <Button onClick={CancleModify} style={{ margin: "0 1rem" }}>
                취소
              </Button>
            </div>
          </Form.Item>
        </Form>
      );
    } else {
      return (
        <div>
          {/* <TextArea
            value={data.content}
            style={{
              fontSize: "1rem",
              width: "50rem",
              resize: "none",
              padding: "1rem",
              textAlign: "center",
            }}
            bordered={false}
            autoSize={true}
            readOnly={true}
          /> */}
          <div dangerouslySetInnerHTML={{ __html: data.content }} style={{width:"50rem"}}></div>
          <div style={{ marginBottom: "1rem" }} />
          <Divider />
          <p style={{ width: "100%", color: "gray" }}>
            {data.modifier} 조교님
            <br />({data.time})
          </p>
          <Button onClick={FormHandler} style={{float:"right"}}>수정하기</Button>
        </div>
      );
    }
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const getData = React.useCallback(async () => {
    const token = localStorage.getItem("user_token");
    const header = {
      headers: {
        authorization: `${token}`,
      },
    };

    const response = await axios.get(
      `https://sjswbot.site/assistantNotice/${department}`, header, { widthCredentials: true }
    );
    console.log(response);
    setData({
      content: response.data.result.content,
      modifier: response.data.result.User.username,
      time: moment(response.data.result.time).format("LLL"),
    });

    form.setFieldsValue({
      content: response.data.result.content,
    });
  }, [department]);

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
          fontSize: "30px",
          fontFamily: "Gothic A1",
        }}
      >
        <p>{department} 공지사항 </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 2rem",
        }}
      >
        {loadContent()}
      </div>
    </div>
  );
};

export default Welcome;
