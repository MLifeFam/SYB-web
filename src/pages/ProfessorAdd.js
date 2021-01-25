import React, { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  Button,
  Carousel,
  Image,
  Divider,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ProfessorAdd = () => {
  const [form] = Form.useForm();
  const [data, getData] = React.useState({});
  const onFinishFunc = async (_data) => {
    const token = localStorage.getItem("user_token");
    const header = {
      headers: {
        authorization: `${token}`,
      },
    };

    console.log(_data);

    const response = await axios
      .post(`https://sjswbot.site/professor`, _data , header, { widthCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return Swal.fire({
            icon: "success",
            title: `등록되었습니다.`,
            showConfirmButton: false,
            width: "auto",
            timer: 1500,
          });
        }

        getData();
      })
      .catch((err) => {
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };


  const showModifier = () => {
    return (
      <div style={{ width: "100%", color: "gray" }}>
        {data.modifier}
        <br />
        {data.time}
      </div>
    );
  };

  useEffect(() => {
    form.setFieldsValue({
        name:"",
        classPosition:"",
        phoneNumber:"",
        email:"",
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
      }}
    >
      <Carousel
        style={{ width: "50rem", height: "32rem", margin: "1rem 1rem 2rem" }}
      >
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99045727-22f9f380-25d5-11eb-8a36-a2135d9fb51d.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99045910-5fc5ea80-25d5-11eb-8f68-7b071a52350e.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99045316-7cadee00-25d4-11eb-9b20-8c5bb4fbb247.png"
            width="100%"
          />
        </div>
      </Carousel>
      <Form
        form={form}
        onFinish={onFinishFunc}
        autoComplete="off"
        style={{ width: "30rem" }}
      >
        <Form.Item label="성함" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="연구실" name="classPosition" required>
          <Input />
        </Form.Item>
        <Form.Item label="전화번호" name="phoneNumber" required>
          <Input />
        </Form.Item>
        <Form.Item label="이메일" name="email" required>
          <Input />
        </Form.Item>
        <Divider />
        {showModifier()}
        <Form.Item colon={false}>
            <center>
                <Button htmlType="submit">
                    등록하기
                </Button>
            </center>
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

export default ProfessorAdd;
