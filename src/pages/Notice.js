import React from "react";
import axios from "axios";
import { Form, Select, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = Select.Option;
const { TextArea } = Input;

const Notice = () => {
    const [form] = Form.useForm();
    const [department, setDepartment] = React.useState("");
    const [data, setData] = React.useState([]);
    const [isDisable, setDisable] = React.useState(true);
    const getData = React.useCallback(async () => {
      const response = await axios.get(`https://mfam.site/notice/${department}`);
      console.log(response);
      setData(response.data);

      form.setFieldsValue({
        department: response.data[0].department,
        link: response.data[0].link,
      });
    }, [department]);

    const onChangeSelectFunc = React.useCallback((e) => {
      console.log(form.getFieldValue("department"));
      setDepartment(form.getFieldValue("department"));
    }, []);
  
    const onValuesChange = (changedValue, allValue) => {
      console.log(changedValue);
    };
  
    const onFinish = async (formData) => {
      const response = await axios
      .put(`https://mfam.site/notice/${formData.department}`, formData)
      .catch((error) => {
        toast.error("에러가 났어요!");
      });
    toast.success("수정에 성공하였습니다!");
    console.log(response);
    };

    React.useEffect(() => {
      getData();
      // eslint-disable-next-line
    }, [department, getData]);

    return (
      <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
        <div style={{ textAlign: "center", fontSize: "30px" }}>
          <p>학과 공지 링크 수정 페이지</p>
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
        <Form.Item label="링크" name="link" required>
          <Input />
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
          <Button type="primary" htmlType="submit">
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
  
export default Notice;
