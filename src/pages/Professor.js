import React from "react";
import axios from "axios";
import { Form, Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Professor = () => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = React.useState("");
    const onFinishFunc = async (data) => {
      const response = await axios
        .put(`http://mfam.site:3001/professor/${inputValue}`, data)
        .catch((error) => {
          toast.error("에러가 났어요!");
        });
      toast.success("수정에 성공하였습니다!");
      console.log(response);
    };
  
    const onChangeFunc = (e) => {
      setInputValue(e.target.value);
    };
  
    const onSearchFunc = async () => {
      console.log(inputValue);
      const response = await axios
        .get(`http://mfam.site:3001/professor/${inputValue}`)
        .catch((error) => {
          toast.error("에러가 났어요!");
        });
      console.log(response);
      if (response.data.length === 0) {
        return toast.error("존재하지 않는 이름입니다.");
      }
      toast.success("교수님 정보를 성공적으로 불러왔습니다.");
      form.setFieldsValue({
        class_position: response.data[0].class_position,
        phone_number: response.data[0].phone_number,
      });
    };
    return (
    <div style={{ margin: "3% 10%", display:"flex",alignItems:"center", flexDirection:"column"}}>
        <div style={{ textAlign: "center", fontSize: "30px" }}>
          <p>교수님 연구실 수정 페이지</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: "0 0 2rem 0", width:"30rem"}}>
          <p style={{width:"5rem"}}>성함:</p>
          <Input style={{ margin: "0 4% 0 0" }} onChange={onChangeFunc} />
          <Button icon={<SearchOutlined />} onClick={onSearchFunc}>
            Search
          </Button>
        </div>
        <Form form={form} onFinish={onFinishFunc} style={{width:"30rem"}}>
          <Form.Item label="연구실" name="class_position">
            <Input />
          </Form.Item>
          <Form.Item label="전화번호" name="phone_number">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 11, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              수정하기
            </Button>
          </Form.Item>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
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

export default Professor;
