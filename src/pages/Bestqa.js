import React from "react";
import axios from "axios";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  Button,
  Carousel,
  Image,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
    formData.modifier = localStorage.getItem("username");
    const response = await axios
      .put(`https://mfam.site/bestqa/${data.id}`, formData)
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
          toast.error("서버와의 에러가 발생했습니다!");
        }
      })
      .catch((err) => {
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };

  return (
    <div style={{ width: "30rem" }}>
      <Form
        initialValues={{ id: data.id, question: data.question }}
        onFinish={confirmFunc}
        autoComplete="off"
        form={form}
      >
        <Form.Item label={`TOP ${data.id} `} name="question">
          <Input />
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            htmlType="submit"
          >
            수정하기
          </Button>
        </Form.Item>
      </Form>
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
    </div>
  );
};

const Bestqa = () => {
  const [data, setData] = React.useState([]);
  const getData = React.useCallback(async () => {
    const response = await axios.get("https://mfam.site/bestqa");
    console.log(response);
    setData(response.data);
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
          margin: "0 0 2rem 0",
          fontFamily: "Gothic A1",
        }}
      >
        자주 묻는 질문 수정 페이지
      </div>
      <Carousel
        style={{ width: "50rem", height: "32rem", margin: "1rem 1rem 2rem" }}
      >
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99047553-b502fb80-25d7-11eb-898a-7b1c46473b0f.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99047557-b6342880-25d7-11eb-8fcf-7256e6887d65.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99047561-b7fdec00-25d7-11eb-87a3-9b443cd8be5a.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99047565-b9c7af80-25d7-11eb-852d-b6d83dd1012f.png"
            width="100%"
          />
        </div>
      </Carousel>
      {data.map((it, i) => {
        return <BestqaData key={it.classname} data={it} />;
      })}
    </div>
  );
};

export default Bestqa;
