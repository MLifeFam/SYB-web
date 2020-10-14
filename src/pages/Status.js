import React from "react";
import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"

const Option = Select.Option;
const { TextArea } = Input;

const Status = () => {
  const [form] = Form.useForm();
  const [department, setDepartment] = React.useState("");
  const [isDisable, setDisable] = React.useState(true);
  const getData = React.useCallback(async () => {
    const response = await axios.get(
      `https://mfam.site/status/${department}`
    );
    console.log(response);
    let data = "";
    if (response.data[0].status === 0) {
      data = "근무중";
    } else if (response.data[0].status === 1) {
      data = "부재중";
    } else {
      data = "기타내용 입력";
    }
    form.setFieldsValue({
      department: response.data[0].department,
      status: data,
      comment: response.data[0].comment,
    });
  }, [department]);

  const onChangeSelectFunc = React.useCallback((e) => {
    console.log(form.getFieldValue("department"));
    setDepartment(form.getFieldValue("department"));
  }, []);

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const onFinish = async (data) => {
    const response = await axios
      .put(`https://mfam.site/status/${data.department}`, data)
      .catch((error) => {
        toast.error("에러가 났어요!");
      });
    toast.success("등록에 성공하였습니다!");
    console.log(response);
  };

  React.useEffect(() => {
    console.log(form.getFieldValue("status"));
    if (form.getFieldValue("status") === "2") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form.data]);

  React.useEffect(() => {
    console.log(department);
    if (department === "") return;
    getData();
  }, [department, getData]);

  return (
    <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily:"Gothic A1"
        }}
      >
        <p >학과 조교 상태 수정 페이지</p>
      </div>

      <Form form={form} onFinish={onFinish} onFieldsChange={onValuesChange} style={{width:"30rem"}}>
        <Form.Item label="학과" name="department" required>
          <Select onChange={onChangeSelectFunc}>
            <Option value="소프트웨어학과">소프트웨어학과</Option>
            <Option value="컴퓨터공학과">컴퓨터공학과</Option>
            <Option value="데이터사이언스학과">데이터사이언스학과</Option>
            <Option value="정보보호학과">정보보호학과</Option>
            <Option value="지능기전공학부">지능기전공학부</Option>
            <Option value="창의소프트학부">창의소프트학부</Option>
          </Select>
        </Form.Item>
        <Form.Item label="상태" name="status" required>
          <Select>
            <Option value="0">근무중</Option>
            <Option value="1">부재중</Option>
            <Option value="2">기타내용 입력</Option>
          </Select>
        </Form.Item>
        <Form.Item label="기타내용" name="comment">
          <TextArea disabled={isDisable} style={{resize:"none"}}/>
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
          <Button type="primary" icon ={<CloudUploadOutlined />} htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Form>
    </div>
  );
};

export default Status;
