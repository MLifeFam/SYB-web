import React from "react";
import axios from "axios";
import { Form, Select, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BestqaData = ({ data }) => {
    const [form] = Form.useForm();
    const onFinishFunc = async (formData) => {
      const response = await axios
        .put(`https://mfam.site/bestqa/${data.id}`, formData)
        .catch((error) => {
          toast.error("에러가 났어요!");
        });
      toast.success("수정에 성공하였습니다!");
      console.log(response);
    };
    return (
      <div style={{width:"30rem"}}>
        <Form
          initialValues={{ id: data.id, question: data.question }}
          onFinish={onFinishFunc}
          form={form}
        >
          <Form.Item label={`Top ${data.id} `} name="question">
            <Input/>
          </Form.Item>
          <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
            <Button type="primary" htmlType="submit">
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
      <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
        <div style={{ textAlign: "center", fontSize: "30px", margin:"0 0 2rem 0"}}>
          자주 묻는 질문 수정 페이지
        </div>
        {data.map((it, i) => {
          return <BestqaData key={it.classname} data={it}/>;
        })}
      </div>
    );
  };
  
export default Bestqa;
