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
  notification,
  Image,
  Divider,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CloudUploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const openNotification = (type,comment) => {
  notification[type]({
    description: comment,
    placement: "bottomRight",
    duration: 2,
    width: "auto",
  });
};

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
          }).then(()=>{
            form.setFieldsValue({
              name:"",
              classPosition:"",
              phoneNumber:"",
              email:"",
            });
          });
        }
      })
      .catch((err) => {
        openNotification('error', '서버와의 에러가 발생했습니다.');
      });
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
            src="https://user-images.githubusercontent.com/51112542/106898715-e18e6580-6737-11eb-9b89-aaed3a8979cb.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106898719-e3582900-6737-11eb-8931-05536127a510.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106898725-e4895600-6737-11eb-95d4-774d237a14e5.png"
            width="100%"
          />
        </div>
      </Carousel>
      <Form
        form={form}
        onFinish={onFinishFunc}
        autoComplete="off"
        style={{ width: "40rem" }}
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
        <Form.Item colon={false}>
            <center>
                <Button htmlType="submit">
                    등록하기
                </Button>
            </center>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfessorAdd;
