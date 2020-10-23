import React from "react";
import { Form, Select, Input, Button,Row, Col, Divider,Modal } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from 'antd/lib/form';
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"

const Option = Select.Option;
const { TextArea } = Input;

const List = ({data}) => {
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
      .delete(`https://mfam.site/knowledgePlus/${data[0]}`, formData)
      .catch((error) => {
        return toast.error("에러가 났어요!");
        console.log(error);
      });
    toast.success("수정에 성공하였습니다!");
  };

  const onChangeFunc = async (formData) => {
    const response = await axios
      .put(`https://mfam.site/knowledgePlus/${data[0]}`, formData)
      .catch((error) => {
        return toast.error("에러가 났어요!");
        console.log(error);
      });
    toast.success("수정에 성공하였습니다!");
    console.log(response);

  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  setTimeout(function () {
    form.setFieldsValue({
      faqno:data[0],
      category1: data[1],
      category2: data[2],
      category3: data[3],
      category4: data[4],
      category5: data[5],
      question: data[6],
      questionAnswer: data[7],
      landingUrl: "",
      imageinfo: data[9],
    });
  },0);

  return (
    <>
    <Divider orientation="left">{data[10]}</Divider>
    <Row justify="start" style={{width:"90%" , border:"1px solid lightgray",padding:"0.8rem 0",margin:"0 1rem", display:"flex",alignItems:"center",borderRadius:"5px"}}>
      <Col flex={9} style={{marginLeft:"2rem"}}>
        {data[6]}
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
          style={{width:"95%", padding:"0 5%"}}
        >
          <Form.Item label="질문" name="question" required>
            <Input initialvalues={data[6]}/>
          </Form.Item>
          <Form.Item label="답변" name="questionAnswer" required>
            <Input initialvalues={data[7]}/>
          </Form.Item>
          <Form.Item label="카테고리 1" name="category1" required>
            <Input initialvalues={data[1]}/>
          </Form.Item>
          <Form.Item label="카테고리 2" name="category2">
            <Input initialvalues={data[2]}/>
          </Form.Item>
          <Form.Item label="카테고리 3" name="category3">
            <Input initialvalues={data[3]}/>
          </Form.Item>
          <Form.Item label="카테고리 4" name="category4">
            <Input initialvalues={data[4]}/>
          </Form.Item>
          <Form.Item label="카테고리 5" name="category5">
            <Input initialvalues={data[5]}/>
          </Form.Item>
          <Form.Item label="답변링크" name="landingUrl">
            <Input initialvalues={data[8]}/>
          </Form.Item>
          <Form.Item label="이미지링크" name="imageinfo">
            <Input initialvalues={data[9]}/>
          </Form.Item>
          
          <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
            <Button type="primary" icon ={<CloudUploadOutlined />} htmlType="submit" style={{margin:"0 1rem"}}>
              수정하기
            </Button>
          </Form.Item>
          <Button type="primary" onClick={onDeleteFunc} style={{backgroundColor:"red", color:"white",border:"none"}}>
            삭제하기
          </Button>
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

const Question = () => {
  const [form] = Form.useForm();
  const [visible,setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
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

  const onFinishFunc = async (formData) => {
    const response = await axios
      .post(`https://mfam.site/knowledgePlus`, formData)
      .catch((error) => {
        return toast.error("에러가 났어요!");
        console.log(error);
      });
    toast.success("수정에 성공하였습니다!");
    console.log(response);
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };
 
  const getData = React.useCallback(async () => {
    const response = await axios.get(`https://mfam.site/knowledgePlus/kakao`);
    setData(response.data.values.reverse());
  }, []);
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily:"Gothic A1"
        }}
      >
        <p >질문 수정 페이지</p>
      </div>
      {data.map((it,i)=>{
        it[10]=(data.length-i);
        return(
            <List key = {i} data={it}/>
        )
      })}
      <div style={{marginBottom:"2rem"}}/>
      <Button onClick={FormHandler}>
        질문 추가
      </Button>
      <Modal
          title="질문추가"
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
          onFinish={onFinishFunc} 
          onFieldsChange={onValuesChange} 
          style={{width:"95%", padding:"0 5%"}}
        >
          <Form.Item label="질문" name="question" required>
            <Input/>
          </Form.Item>
          <Form.Item label="답변" name="questionAnswer" required>
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 1" name="category1" required>
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 2" name="category2">
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 3" name="category3">
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 4" name="category4">
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 5" name="category5">
            <Input/>
          </Form.Item>
          <Form.Item label="답변링크" name="landingUrl">
            <Input/>
          </Form.Item>
          <Form.Item label="이미지링크" name="imageinfo">
            <Input/>
          </Form.Item>
          
          <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
            <Button type="primary" icon ={<CloudUploadOutlined />} htmlType="submit" style={{margin:"0 1rem"}}>
              추가하기
            </Button>
          </Form.Item>
        </Form>
        </Modal>
    </div>
  );
};

export default Question;
