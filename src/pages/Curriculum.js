import React from "react";
import axios from "axios";
import { Form, Select, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"

const Option = Select.Option;
const { TextArea } = Input;

const Curriculum = () => {
    const [form] = Form.useForm();
    const department = localStorage.getItem('department');
    const [data, setData] = React.useState([]);
    const [isDisable, setDisable] = React.useState(true);
    const getData = React.useCallback(async () => {
      const response = await axios.get(`https://mfam.site/curriculum/${department}`);
      console.log(response);
      setData(response.data);

      form.setFieldsValue({
        department: response.data[0].department,
        link: response.data[0].link,
      });
    }, [department]);

    const onChangeSelectFunc = React.useCallback((e) => {
      console.log(form.getFieldValue("department"));
    }, []);
  
    const onValuesChange = (changedValue, allValue) => {
      console.log(changedValue);
    };
  
    const onFinish = async (formData) => {
      let data = {userid:localStorage.getItem('userid')};
      Object.assign(data,formData);
      // formdata에 userid 추가
      const response = await axios
      .put(`https://mfam.site/${formData.department}`, formData)
      .then((res)=>{
        toast.success("수정에 성공하였습니다!");
      })
      .catch((error) => {
        toast.error("에러가 났어요!");
      });
    };

    React.useEffect(() => {
      getData();
      // eslint-disable-next-line
    }, [department, getData]);

    return (
      <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
        <div style={{ textAlign: "center", fontSize: "30px", fontFamily:"Gothic A1"}}>
          <p>교과 과정 링크 수정 페이지</p>
        </div>
        <Form form={form} onFinish={onFinish} onFieldsChange={onValuesChange} style={{width:"30rem"}}>
        <Form.Item label="학과" name="department" value={department} required>
          <Input readOnly="true"/>
        </Form.Item>
        <Form.Item label="링크" name="link" required>
          <Input />
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
  
export default Curriculum;
