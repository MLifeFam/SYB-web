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

  const onFinish = () => {

  }

  const onValuesChange = () => {

  }

  return (
    <>
    <Divider orientation="left">{data[0]}</Divider>
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
        >
        <Form form={form} onFinish={onFinish} onFieldsChange={onValuesChange} style={{width:"30rem"}}>
          <Form.Item label="질문" name="Question" required>
            <Input defaultValue={data[6]}/>
          </Form.Item>
          <Form.Item label="답변" name="Answer" required>
            <Input defaultValue={data[7]}/>
          </Form.Item>
          <Form.Item label="카테고리 1" name="Category1" required>
            <Input defaultValue={data[1]}/>
          </Form.Item>
          <Form.Item label="카테고리 2" name="Category2">
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 3" name="Category3">
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 4" name="Category4">
            <Input/>
          </Form.Item>
          <Form.Item label="카테고리 5" name="Category5">
            <Input/>
          </Form.Item>
          <Form.Item label="답변링크" name="Q_link">
            <Input defaultValue={data[8]}/>
          </Form.Item>
          <Form.Item label="이미지링크" name="Img_link">
            <Input defaultValue={data[9]}/>
          </Form.Item>
          
          <Form.Item colon={false} wrapperCol={{ span: 11, offset: 11 }}>
            <Button type="primary" icon ={<CloudUploadOutlined />} htmlType="submit">
              수정하기
            </Button>
          </Form.Item>
        </Form>
        </Modal>
      </Col>
    </Row>
    </>
  );
};

const Question = () => {
  const [data, setData] = React.useState([]);
    const getData = React.useCallback(async () => {
      const response = await axios.get(`https://mfam.site/knowledgePlus/kakao`);
      setData(response.data.values);
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
      {data.reverse().map((it,i)=>{
        return(
            <List key = {it[0]} data={it}/>
        )
      })}
      <div style={{marginBottom:"2rem"}}/>
    </div>
  );
};

export default Question;
