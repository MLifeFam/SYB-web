import React, { useState } from "react";
import axios from "axios";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  Divider,
  notification,
  Button,
  Carousel,
  Image,
} from "antd";
import moment from "moment";
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

const BestqaData = ({ data, key }) => {
  const [form] = Form.useForm();
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

  const onFinishFunc = async (formData) => {
    const token = localStorage.getItem("user_token");
    const header = {
      headers: {
        authorization: `${token}`,
      },
    };
    console.log(formData);
    const response = await axios
      .put(`https://sjswbot.site/bestqa/${data.idx}`, formData,header,{ widthCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "수정 완료",
            showConfirmButton: false,
            width: "20rem",
            timer: 1500,
          });
        } else {
          return openNotification('error', '서버와의 에러가 발생했습니다.');
        }
      })
      .catch((err) => {
        return openNotification('error', '서버와의 에러가 발생했습니다.');
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height:"auto",
        margin:"0.5rem 0"
      }}
    >
      <Form
        initialValues={{ id: data.idx, question: data.question }}
        onFinish={confirmFunc}
        autoComplete="off"
        form={form}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Form.Item label={`TOP ${data.idx} `} name="question">
          <Input style={{ width: "30vw" }} />
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
          <Button icon={<CloudUploadOutlined />} htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
        <div style={{color: "gray" ,marginLeft:'5rem'}}>
            {data.User.username} 조교님
            <br />({moment(data.updatedAt).format("LLL")})
        </div>
      </Form>
    </div>
  );
};

const Bestqa = () => {
  const [data, setData] = React.useState([]);
  const getData = React.useCallback(async () => {
    const response = await axios.get("https://sjswbot.site/bestqa");
    console.log(response);
    setData(response.data.result);
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
        <p>자주 묻는 질문 수정 페이지</p>
      </div>
      <Carousel
        style={{ width: "50rem", height: "32rem", margin: "1rem 1rem 2rem" }}
      >
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106900224-9bd29c80-6739-11eb-982b-2d8dfdadb5b5.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106900225-9d03c980-6739-11eb-8318-f08e617a2651.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106900229-9e34f680-6739-11eb-8e25-a8dac86eff44.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106900234-9f662380-6739-11eb-8d10-08bfc76dca34.png"
            width="100%"
          />
        </div>
      </Carousel>
      {data.map((it, i) => {
        return <BestqaData key={i} data={it} />;
      })}
    </div>
  );
};

export default Bestqa;
