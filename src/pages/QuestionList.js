import React from "react";
import { Form, Select, Input, Button,Row, Col, Divider,Modal } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from 'antd/lib/form';
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined , ExclamationCircleOutlined } from "@ant-design/icons"

const QuestionList = ({data,getData,setPage,page}) => {
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
  
    const onDeleteFunc = async (formData) => {
      const response = await axios
        .delete(`https://mfam.site/knowledgePlus/${data.faqno}`, formData)
        .catch((error) => {
          return toast.error("에러가 났어요!");
          console.log(error);
        });
      toast.success("질문을 삭제했습니다!");
      setVisible(false);
      setPage(page);
      getData();
    };
  
    const onChangeFunc = async (formData) => {
        // 공백 문자처리
        for (const [key, value] of Object.entries(formData)) {
          if(value === undefined || value === null || value === NaN){
            formData[key]="";
          }
        }
  
      const response = await axios
        .put(`https://mfam.site/knowledgePlus/${data.faqno}`, formData)
        .catch((error) => {
          return toast.error("에러가 났어요!");
          console.log(error);
        });
      toast.success("질문을 수정했습니다!");
      console.log(response);
      setVisible(false);
      setPage(page);
      getData();
    };
  
    const onValuesChange = (changedValue, allValue) => {
      console.log(changedValue);
    };
  
    setTimeout(function () {
      form.setFieldsValue({
        faqno:data.faqno,
        category1: data.category1,
        category2: data.category2,
        category3: data.category3,
        category4: data.category4,
        category5: data.category5,
        question: data.question,
        questionAnswer: data.questionAnswer,
        landingUrl: data.landingUrl,
        imageinfo: data.imageinfo,
      });
    },0);
  
  
    return (
      <>
      <Divider orientation="left">{data.count}</Divider>
      <Row justify="start" style={{width:"90%" , border:"1px solid lightgray",padding:"0.8rem 0",margin:"0 1rem", display:"flex",alignItems:"center",borderRadius:"5px"}}>
        <Col flex={9} style={{marginLeft:"2rem",width:"70%"}}>
          {data.question}
        </Col>
        <Col flex={1}>
          <Button onClick={FormHandler}>수정하기</Button>
          <Modal
            title="질문수정"
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
              label="질문" 
              name="question"
              rules={[
                {
                  required: true,
                  message: '질문을 입력해주세요',
                },
              ]}
              required
            >
              <Input initialvalues={data.question}/>
            </Form.Item>
            <Form.Item
              label="답변"
              name="questionAnswer"
              rules={[
                {
                  required: true,
                  message: '답변을 입력해주세요',
                },
              ]}
              required
            >
              <Input initialvalues={data.questionAnswer}/>
            </Form.Item>
            <Form.Item
              label="카테고리 1"
              name="category1"
              rules={[
                {
                  required: true,
                  message: '하나 이상의 카테고리를 설정해주세요',
                },
              ]}
              required
            >
              <Input initialvalues={data.category1}/>
            </Form.Item>
            <Form.Item label="카테고리 2" name="category2">
              <Input initialvalues={data.category2}/>
            </Form.Item>
            <Form.Item label="카테고리 3" name="category3">
              <Input initialvalues={data.category3}/>
            </Form.Item>
            <Form.Item label="카테고리 4" name="category4">
              <Input initialvalues={data.category4}/>
            </Form.Item>
            <Form.Item label="카테고리 5" name="category5">
              <Input initialvalues={data.category5}/>
            </Form.Item>
            <Form.Item label="답변링크" name="landingUrl">
              <Input initialvalues={data.landingUrl}/>
            </Form.Item>
            <Form.Item label="이미지링크" name="imageinfo">
              <Input initialvalues={data.imageinfo}/>
            </Form.Item>
            
            <Form.Item colon={false} wrapperCol={{ span: 20, offset: 7 }}>
              <Button icon ={<CloudUploadOutlined />} htmlType="submit">
                수정하기
              </Button>
            <Button icon ={<ExclamationCircleOutlined />} type="primary" onClick={onDeleteFunc} style={{backgroundColor:"red", color:"white",border:"none",marginLeft:"3rem"}}>
                삭제하기
              </Button>
            </Form.Item>
          </Form>
          </Modal>13
          
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

  export default QuestionList;
