import React from "react";
import { Form, Select, Input, Button,Row, Col, Divider,Modal,Pagination } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from 'antd/lib/form';
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"
import QuestionList from "./QuestionList"

const Option = Select.Option;
const { TextArea } = Input;

const Question = (props) => {
  const [form] = Form.useForm();
  const [visible,setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page,setPage] = React.useState(1);
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

  const PageRefresh = (num) => {
    const _data= data.slice(num-1,num);

    return _data.map((it,i)=>{
      it.count=data.length-num+1;
      it.props=props;
      return(
          <QuestionList key = {i} data={it} getData={getData} setPage={setPage} page={page}/>
      )
    })
  };

  const onFinishFunc = async (formData) => {
    // 공백 문자처리
    for (const [key, value] of Object.entries(formData)) {
      if(value === undefined || value === null || value === NaN){
        formData[key]="";
      }
    }

    const response = await axios
      .post(`https://mfam.site/knowledgePlus`, formData)
      .catch((error) => {
        return toast.error("에러가 났어요!");
        console.log(error);
      });
    toast.success("질문을 등록했습니다!");
    console.log(response);
    setPage(1);
    getData();
    setVisible(false);
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };
 
  const onPageChange = (pagenum) => {
    setPage(pagenum);
    getData();
  }

  const getData = React.useCallback(async () => {
    const response = await axios.get(`https://mfam.site/knowledgePlus`);
    setData(response.data.reverse());
    //setData(response.data.values.reverse());
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
      {/* {data.map((it,i)=>{
        it.count=data.length-i;
        it.props=props;
        return(
            <QuestionList key = {i} data={it} getData={getData}/>
        )
      })} */}
      {PageRefresh(page)}
      <div style={{marginBottom:"2rem"}}/>
      
      <Pagination current={page} total={data.length} defaultPageSize={1} onChange={onPageChange} style={{marginBottom:"1.5rem"}}/>

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
            <Input/>
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
            <Input/>
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
