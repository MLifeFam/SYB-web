import React, {useEffect} from "react";
import { Form, Select, Input, Button,Row, Col, Divider,Modal } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from 'antd/lib/form';
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined , ExclamationCircleOutlined } from "@ant-design/icons"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const AssistanceNotice = ({data,getData,setPage,page}) => {
    console.log(data);
    const [form] = Form.useForm();
    const [visible,setVisible] = React.useState(false);
    const num = data[0];
    const FormHandler = () => {
      setVisible(true);
    };
  
    const handleOk = (e) => {
      setVisible(false);
    };
  
    const handleCancel = (e) => {
      setVisible(false);
    };

    const confirmFunc = (formData) => {
      Swal.fire({
        title: '삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네',
        cancelButtonText:'아니요'
      }).then((result) => {
        if (result.isConfirmed) {
          onDeleteFunc(formData);
        }
      });
    }
  
    const onDeleteFunc = async (formData) => {
      const response = await axios
        .delete(`https://mfam.site/assistanceNotice/${data.department}/${data.id}`, formData)
        .catch((error) => {
          return toast.error("에러가 났어요!");
          console.log(error);
        });
      setVisible(false);
      setPage(page);
      getData();
      toast.success("질문을 삭제했습니다!");
    };
  
    const onChangeFunc = async (formData) => {
        // 공백 문자처리
        for (const [key, value] of Object.entries(formData)) {
          if(value === undefined || value === null || value === NaN){
            formData[key]="";
          }
        }
  
      const response = await axios
        .put(`https://mfam.site/assistacneNotice/${data.department}`, formData)
        .then((res)=>{
          console.log(res.status);
          if(res.status===200){
          setVisible(false);
          setPage(page);
          getData();
          toast.success("질문을 수정했습니다!");
          }
          else{
            toast.error("에러가 났어요!");
          }
        })
        .catch((error) => {
          toast.error("에러가 났어요!");
        });

    };
  
    const onValuesChange = (changedValue, allValue) => {
      console.log(changedValue);
    };
    
    useEffect(() => {
      form.setFieldsValue({
          id:data.id,
          department:data.department,
          content:data.content,
          modifier:localStorage.getItem('username'),
      });
    });

    return (
      <>
      <Divider orientation="left">{data.count}</Divider>
      <Row justify="start" style={{width:"90%" , border:"1px solid lightgray",padding:"0.8rem 0",margin:"0 1rem", display:"flex",alignItems:"center",borderRadius:"5px"}}>
        <Col flex={9} style={{marginLeft:"2rem",width:"70%"}}>
          {data.content}
        </Col>
        <Col flex={1}>
          <Button onClick={FormHandler}>수정하기</Button>
          <Modal
            title="공지수정"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              null,
              null,
            ]}  //ok와 cancel 버튼을 없애기 위함
            width="40rem"
          >
          <Form 
            form={form} 
            onFinish={onChangeFunc} 
            onFieldsChange={onValuesChange}
            autoComplete="off"
            style={{width:"95%", padding:"0 5%"}}
          >
           <Form.Item 
              label="내용" 
              name="content"
              rules={[
                {
                  required: true,
                  message: '내용을 입력해주세요',
                },
              ]}
              required
            >
              <Input initialvalues={data.content}/>
            </Form.Item>
           
            <Form.Item colon={false} wrapperCol={{ span: 20, offset: 7 }}>
              <Button icon ={<CloudUploadOutlined />} htmlType="submit">
                수정하기
              </Button>
            <Button icon ={<ExclamationCircleOutlined />} type="primary" onClick={confirmFunc} style={{backgroundColor:"red", color:"white",border:"none",marginLeft:"3rem"}}>
                삭제하기
              </Button>
            </Form.Item>
          </Form>
          </Modal>
          
        </Col>
      </Row>
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
      </>
    );
  };

  export default AssistanceNotice;
