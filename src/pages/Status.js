import React from "react";
import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from 'antd/lib/form';
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const Option = Select.Option;
const { TextArea } = Input;

const Status = () => {
  const [form] = Form.useForm();
  const department = localStorage.getItem('department');
  const [isDisable, setDisable] = React.useState(true);
  const getData = React.useCallback(async () => {
    const response = await axios.get(
      `https://mfam.site/status/${department}`
    );

    let data = "";
    if (response.data[0].status === 0) {
      data = "근무중";
    } else if (response.data[0].status === 1) {
      data = "부재중";
    } else {
      data = "기타내용 입력";
    }
    form.setFieldsValue({
      department: response.data[0].department,
      status: data,
      comment: response.data[0].comment,
    });
  });

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const confirmFunc = (formData) => {
    Swal.fire({
      title: '수정하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText:'아니요'
    }).then((result) => {
      if (result.isConfirmed) {
        onFinish(formData);
      }
    });
  }

  const onFinish = async (data) => {
    const response = await axios
      .put(`https://mfam.site/status/${data.department}`, data)
      .then((res)=>{
        if(res.status===200){
          return Swal.fire({
            icon: 'success',
            title: '수정 완료',
            showConfirmButton: false,
            width:'20rem',
            timer: 1500
          })
        }
      })
      .catch((err)=>{
        toast.error("서버와의 에러가 발생했습니다!");
      });
    };

  React.useEffect(() => {
    console.log(form.getFieldValue("status"));
    if (form.getFieldValue("status") === "2") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form.data]);

  React.useEffect(() => {
    console.log(department);
    if (department === "") return;
    getData();
  }, [department, getData]);

  return (
    <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily:"Gothic A1"
        }}
      >
        <p >{department} 조교 상태 수정 페이지</p>
      </div>

      <Form form={form} onFinish={confirmFunc} onFieldsChange={onValuesChange} style={{width:"30rem"}}>
        <Form.Item label="학과" name="department" value={department} required>
          <Input readOnly="true"/>
        </Form.Item>
        <Form.Item label="상태" name="status" required>
          <Select>
            <Option value="0">근무중</Option>
            <Option value="1">부재중</Option>
            <Option value="2">기타내용 입력</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(preValues,currentValues)=>preValues.status !== currentValues.status}
        >
          {({ getFieldValue })=>{
            return form.getFieldValue('status') === '2' || form.getFieldValue('status')==='기타내용 입력' ?
            (
              <Form.Item label="기타내용" name="comment" rules={[{required:true, messsage:'기타 내용을 입력해주세요'}]}>
                <TextArea disabled={isDisable} style={{resize:"none"}}/>
              </Form.Item>)
            : null;
          }}
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

export default Status;
