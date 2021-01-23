import React from "react";
import moment from "moment";
import { Form, Select, Input, Button, Carousel, Image, Divider } from "antd";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from "antd/lib/form";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Option = Select.Option;
const { TextArea } = Input;

const Status = () => {
  const id = localStorage.getItem("username");
  //const [time,setTime] = React.useState(new Date().toLocaleString());
  const [form] = Form.useForm();
  const department = localStorage.getItem("department");
  const deptname = localStorage.getItem("dept_name");
  const [isDisable, setDisable] = React.useState(true);
  const [data, setData] = React.useState({});
  const getData = React.useCallback(async () => {
    const response = await axios.get(`https://sjswbot.site/status/${department}`);
    console.log(response);
    let data = "";
    if (response.data.result.status === 1) {
      data = "근무중";
    } else if (response.data.result.status === 2) {
      data = "휴가중";
    }
    setData({
      modifier: response.data.result.User.username,
      time: moment(response.data.result.time).format("LLL"),
      // 시간 안더해줘도 됨 (21-01-21)
    });
    form.setFieldsValue({
      // department: response.data.result.department,
      status: data,
      comment: response.data.result.comment,
      position: response.data.result.position,
      phoneNumber: response.data.result.phoneNumber,
      // time: time,
    });
  });

  const onValuesChange = (changedValue, allValue) => {

  };

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
        // setTime(new Date().toLocaleString());
        console.log(formData);
        onFinish(formData);
      }
    });
  };

  const onFinish = async (data) => {
    // data.modifier = localStorage.getItem("username");
    // 기존 modifier 넣어준 것 뺌
    const token = localStorage.getItem("user_token");
    const header = {
      headers: {
        authorization: `${token}`,
      },
    };

    if(data.status === "근무중"){
      data.status = 1;
    }
    else if (data.status === "휴가중"){
      data.status = 2;
    }
    
    const response = await axios
      .put(`https://sjswbot.site/status/${department}`, data, header, { widthCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return Swal.fire({
            icon: "success",
            title: "수정 완료",
            showConfirmButton: false,
            width: "20rem",
            timer: 1500,
          });
        }
        getData();
      })
      .catch((err) => {
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };

  React.useEffect(() => {
    setDisable(false);
  }, [form.data]);

  React.useEffect(() => {
    console.log(department);
    if (department === "") return;
    getData();
  }, [department]);

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
        <p>{deptname} 사무실 수정 페이지</p>
      </div>
      <Carousel
        style={{ width: "50rem", height: "32rem", margin: "1rem 1rem 2rem" }}
      >
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/98468848-ae633580-221f-11eb-9afd-762834755b54.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/98468849-af946280-221f-11eb-975b-d12318fc58ad.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/98468851-b0c58f80-221f-11eb-9868-c9392a9bf029.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/98468853-b1f6bc80-221f-11eb-9928-35e67889354c.png"
            width="100%"
          />
        </div>
      </Carousel>
      <Form
        form={form}
        onFinish={confirmFunc}
        onFieldsChange={onValuesChange}
        style={{ width: "40rem" }}
      >
        {/* <Form.Item
          label="학과"
          name="department"
          value={department}
          style={{
            width: "0rem",
            height: "0rem",
            visibility: "hidden",
            margin: "0",
          }}
        >
          <Input readOnly={true} />
        </Form.Item> */}
        {/* <Form.Item label="시간" name="time" value={time} style={{width:"0rem", height:"0rem" , visibility:"hidden", margin:"0"}}>
          <Input readOnly="true"/>
        </Form.Item> */}
        {/* <Form.Item
          label="이름"
          name="modifier"
          value={id}
          style={{
            width: "0rem",
            height: "0rem",
            visibility: "hidden",
            margin: "0",
          }}
        >
          <Input readOnly={true} />
        </Form.Item> */}
        <Form.Item label="위치" name="position" required>
          <Input />
        </Form.Item>
        <Form.Item label="전화번호" name="phoneNumber" required>
          <Input />
        </Form.Item>
        <Form.Item label="조교 부재여부" name="status" required>
          <Select>
            <Option value="1">근무중</Option>
            <Option value="2">휴가중</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="기타내용"
          name="comment"
          // rules={[
          //   { required: true, messsage: "코멘트르 입력해주세요" },
          // ]}\
          required
        >
          <TextArea disabled={isDisable} style={{ resize: "none" }} />
        </Form.Item>
        <Divider />
        <p style={{ width: "100%", color: "gray" }}>
          {data.modifier} 조교님
          <br />({data.time})
        </p>
        <Form.Item colon={false} wrapperCol={{ offset: 11 }}>
          <Button icon={<CloudUploadOutlined />} htmlType="submit">
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
