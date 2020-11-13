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
    // 공백 문자처리
    for (const [key, value] of Object.entries(formData)) {
      if (value === undefined || value === null || value === NaN) {
        formData[key] = "";
      }
    }
    formData.modifier = name;
    const response = await axios
      .put(`https://mfam.site/assistantNotice/${department}`, formData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "수정 완료",
            showConfirmButton: false,
            width: "20rem",
            timer: 1500,
          });
          setVisible(false);
          getData();
        } else {
          toast.error("서버와의 에러가 발생했습니다!");
        }
      })
      .catch((err) => {
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };

  const loadContent = () => {
    console.log(visible);
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
            <TextArea
              style={{
                fontSize: "1rem",
                width: "50rem",
                resize: "none",
                padding: "1rem",
                textAlign: "center",
              }}
              autoSize={true}
              resize="none"
            />
          </Form.Item>
          <div style={{ marginBottom: "1rem" }} />
          <Divider />
          <p style={{ width: "100%", color: "gray", marginBottom: "2rem" }}>
            수정 하시려면 수정하기 버튼을, 취소하려면 취소 버튼을 눌러주세요{" "}
          </p>
          <Form.Item colon={false} wrapperCol={{ offset: 11 }}>
            <div style={{ display: "inline-block" }}>
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
        <>
          <TextArea
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
          />
          <div style={{ marginBottom: "1rem" }} />
          <Divider />
          <p style={{ width: "100%", color: "gray" }}>
            {data.modifier} 조교님
            <br />({data.time})
          </p>
          <Button onClick={FormHandler}>수정하기</Button>
        </>
      );
    }
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const getData = React.useCallback(async () => {
    const response = await axios.get(
      `https://mfam.site/assistantNotice/${department}`
    );
    console.log(response);
    setData(response.data.result[0]);

    form.setFieldsValue({
      content: response.data.result[0].content,
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
          textAlign: "center",
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
