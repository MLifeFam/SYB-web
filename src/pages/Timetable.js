import React from "react";
import axios from "axios";
import { Form, Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"

const Timetable = () => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = React.useState("");
    const onFinishFunc = async (data) => {
      const response = await axios
        .put(`https://mfam.site/timetable/${inputValue}`, data)
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
        .get(`https://mfam.site/timetable/${inputValue}`)
        .catch((error) => {
          toast.error("에러가 났어요!");
        });
      console.log(response);
      if (response.data.length === 0) {
        return toast.error("존재하지 않는 강의실입니다.");
      }
      toast.success("강의실 정보를 성공적으로 불러왔습니다.");
      form.setFieldsValue({
        link: response.data[0].link,
      });
    };
    return (
    <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
        <div style={{ textAlign: "center", fontSize: "30px" , fontFamily:"Gothic A1"}}>
          <p>강의실 시간표 수정 페이지</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: "0 0 2rem 0", width:"30rem"}}>
          <p style={{width:"5rem"}}>강의실:</p>
          <Input style={{ margin: "0 4% 0 0" }} onChange={onChangeFunc} />
          <Button icon={<SearchOutlined />} onClick={onSearchFunc}>
            Search
          </Button>
        </div>
        <Form form={form} onFinish={onFinishFunc} style={{width:"30rem"}}>
          <Form.Item label="링크" name="link">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 11, offset: 11 }}>
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

export default Timetable;
