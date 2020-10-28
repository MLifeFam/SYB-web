import React from "react";
import axios from "axios";
import { Form, Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const Professor = () => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = React.useState("");
    const onFinishFunc = async (data) => {
      console.log(inputValue);
      const response = await axios
        .put(`https://mfam.site/professor/${inputValue}`, data)
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
          onFinishFunc(formData);
        }
      });
    }
  
    const onChangeFunc = (e) => {
      setInputValue(e.target.value);
    };
  
    const onSearchFunc = async () => {
      let name = inputValue.replace(/(\s*)/g,"");   // 띄어쓰기 제거
      if(name.length<2){
        return toast.error("존재하지 않는 이름입니다.");
      }
      const response = await axios
        .get(`https://mfam.site/professor/${name}`)
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
    <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
        <div style={{ textAlign: "center", fontSize: "30px", fontFamily:"Gothic A1" }}>
          <p>교수님 연구실 수정 페이지</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: "0 0 2rem 0", width:"30rem"}}>
          <p style={{width:"5rem"}}>성함:</p>
          <Input style={{ margin: "0 4% 0 0" }} onChange={onChangeFunc} />
          <Button icon={<SearchOutlined />} onClick={onSearchFunc}>
            Search
          </Button>
        </div>
        <Form form={form} onFinish={onFinishFunc} autoComplete="off" style={{width:"30rem"}}>
          <Form.Item label="연구실" name="class_position">
            <Input />
          </Form.Item>
          <Form.Item label="전화번호" name="phone_number">
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

export default Professor;
