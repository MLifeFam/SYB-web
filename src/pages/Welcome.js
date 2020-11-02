import React from "react";
import { Form, Select, Input, Button,Row, Col, Divider,Modal,Pagination ,Image,Carousel} from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from 'antd/lib/form';
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import AssistantNotice from "./AssistanceNotice"

const Option = Select.Option;
const { TextArea } = Input;

const Welcome = (props) => {
  const department = localStorage.getItem('department');
  const pageSize = parseInt(window.innerHeight/150);
  // 한 페이지에 담을 데이터 수 (height에 따라 개수 다르게 설정)
  const [form] = Form.useForm();
  const [visible, Visible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page,setPage] = React.useState(1);
  const num = data[0];
  const FormHandler = () => {
    Visible(true);
  };

  const handleOk = (e) => {
    Visible(false);
  };

  const handleCancel = (e) => {
    Visible(false);
  };

  const PageRefresh = (num) => {
    const _data= data.slice((num-1)*pageSize,(num-1)*pageSize+pageSize);
    // data page에 따라 자르는 작업

    window.scrollTo({ top: 0, behavior: 'smooth' })
    // data 새로 불러올시 맨 위로 스크롤
    
    return _data.map((it,i)=>{
      it.count=data.length-i-(pageSize*(page-1));
      // 게시글 번호 계산
  
      it.props=props;
      return(
          <AssistantNotice key = {i} data={it} getData={getData} setPage={setPage} page={page}/>
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
      .post(`https://mfam.site/assistantNotice/${department}`, formData)
      .then((res)=>{
        console.log(res);
        if(res.status===200){
          toast.success("공지사항을 등록했습니다!");
          setPage(1);
          getData();
          Visible(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };
 
  const onPageChange = (pagenum) => {
    //pagenum은 1,2,3,4 식으로 전송 됨.
    setPage(pagenum);
    getData();
  }

  const getData = React.useCallback(async () => {
    const response = await axios.get(`https://mfam.site/assistantNotice/${department}`);
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
        <p > 공지사항 </p>
      </div>
      {PageRefresh(page)}
      <div style={{marginBottom:"2rem"}}/>
      
      <Pagination current={page} total={data.length} defaultPageSize={pageSize} onChange={onPageChange} style={{marginBottom:"1.5rem"}}/>

      <Button onClick={FormHandler}>
        공지사항 등록
      </Button>
      <Modal
          title="공지사항 등록"
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
            <TextArea/>
          </Form.Item>
          <Form.Item colon={false} wrapperCol={{ offset: 9 }}>
            <Button icon ={<CloudUploadOutlined />} htmlType="submit" style={{margin:"1rem 1rem 0 1rem"}}>
              추가하기
            </Button>
          </Form.Item>
        </Form>
        </Modal>
    </div>
  );
};

export default Welcome;
