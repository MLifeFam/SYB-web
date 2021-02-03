import React from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Modal,
  notification,
  Tooltip,
  Pagination,
  Image,
  Carousel,
  Checkbox,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormInstance } from "antd/lib/form";
import { CloudUploadOutlined ,QuestionCircleOutlined } from "@ant-design/icons";
import QuestionList from "./QuestionList";

const Option = Select.Option;
const category = ["일반","학사","입학","학과행사","공모전","경시대회","교내모집","장학","기타"];
const openNotification = (type,comment) => {
  notification[type]({
    description: comment,
    placement: "bottomRight",
    duration: 1.5,
    width: "auto",
  });
};

const { TextArea } = Input;

const Question = (props) => {
  const pageSize = parseInt(window.innerHeight / 70);
  // 한 페이지에 담을 데이터 수 (height에 따라 개수 다르게 설정)
  const department = localStorage.getItem("department");
  const deptname = localStorage.getItem("dept_name");
  const [mode,setmode] = React.useState(false);
  const [dataSize,setdataSize] = React.useState(0);
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [helpvisible,setHelpVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dep,setDep] = React.useState([]);
  const token = localStorage.getItem("user_token");
  const header = {
    headers: {
      authorization: `${token}`,
    },
  };

  const loadDep = () => {
    axios
      .get("https://sjswbot.site/dep")
      .then((res) => {
        setDep(res.data.result);
      })
      .catch((error) => {
        console.log("에러발생")
      });
  }

  const FormHandler = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const PageRefresh = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // data 새로 불러올시 맨 위로 스크롤

    // return data.map((it, i) => {

    //   return (
    //     <QuestionList
    //       key={i}
    //       data={it}
    //       count={dataSize - i - pageSize * (page)}
    //       getData={getData}
    //       setPage={setPage}
    //       pageSize={pageSize}
    //       page={page}
    //     />
    //   );
    // });
  };

  const onFinishFunc = async (formData) => {
    // 공백 문자처리
    for (const [key, value] of Object.entries(formData)) {
      if (value === undefined || value === null || value === NaN) {
        formData[key] = "";
      }
    }

    const response = await axios
      .post(`https://sjswbot.site/knowledgePlus`, formData, header, { widthCredentials:true })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setPage(0);
          getData();
          setVisible(false);
          form.setFieldsValue({
            faqno: "",
            category1: "",
            category2: "",
            category3: "",
            category4: "",
            question: "",
            questionAnswer: "",
            landingUrl: "",
            imageinfo: "",
          });
          return openNotification('success', '질문을 등록했습니다!');
        }
      })
      .catch((error) => {
        return openNotification('error', '서버와의 에러가 발생했습니다.');
      });
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const onPageChange = (pagenum) => {
    //pagenum은 1,2,3,4 식으로 전송 됨.
    setPage(pagenum-1);
  };

  const getData = React.useCallback(async () => {
    if (!mode){
      const response = await axios.get(`https://sjswbot.site/knowledgePlus/list/${deptname}?page=${page}&size=${pageSize}`,header,{ widthCredentials: true });
      console.log(response);
      setdataSize(response.data.result.count);
      setData(response.data.result.rows);
    }
    else{
      const response = await axios.get(`https://sjswbot.site/knowledgePlus/?page=${page}&size=${pageSize}`,header,{ widthCredentials: true });
      console.log(response);
      setdataSize(response.data.result.count);
      setData(response.data.result.rows);
    }
  }, [page,setPage]);

  const changeMode = React.useCallback(async () =>{
    if(!mode){
      const response = await axios.get(`https://sjswbot.site/knowledgePlus/list/${deptname}?page=0&size=${pageSize}`,header,{ widthCredentials: true });
      console.log(response);
      setdataSize(response.data.result.count);
      setData(response.data.result.rows);
      setPage(0);
    }
    else{
      const response = await axios.get(`https://sjswbot.site/knowledgePlus/?page=0&size=${pageSize}`,header,{ widthCredentials: true });
      console.log(response);
      setdataSize(response.data.result.count);
      setData(response.data.result.rows);
      setPage(0);
    }
  },[mode,setmode]);

  React.useEffect(() => {
    getData();
    loadDep();
  }, [page,setPage]);

  React.useEffect(() => {
    changeMode();
  }, [mode,setmode]);

  return (
    <div
      style={{
        margin: "3% 10%",
        padding: "1% 0%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
        borderRadius: "0.5rem",
        border: "2px solid lightgray",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily: "Gothic A1",
          width:"100%"
        }}
      >
        <div style={{width:"100%",margin:"1rem 0 1rem"}}>
          지식+ 질문 추가/수정 페이지
          <QuestionCircleOutlined  onClick={()=>setHelpVisible(true)} style={{fontSize:"1.5rem",margin:"1rem 5rem 0",float:"right",position:"absolute"}}/>
        </div>

      </div>
      소융봇에서 제공 할 질문과 답변을 관리하는 페이지입니다.
      <div style={{ display: "flex", flexDirection: "row", margin: "10px 0 2rem" }}>
        <Link to="/userquestion">
          <u>유저들의 질문</u>
        </Link>{" "}
        에서 질문을 골라보세요 😊
      </div>
      <div style={{width:"100%",marginRight:"8rem"}}>
        <Checkbox 
        onClick={()=>{
            mode
            ?setmode(false)
            :setmode(true)
          }
        }
        style={{float:"right",fontSize:"0.7rem"}}
        >
          타학과 질문 포함하기
        </Checkbox>
      </div>
      <Modal
        centered
        visible={helpvisible}
        onOk={() => setHelpVisible(false)}
        onCancel={() => setHelpVisible(false)}
        width={"auto"}
        height={"auto"}
        footer={null}
      >
        <Carousel
          style={{ width: "65rem", margin: "1rem", lineHeight:"8rem" }}
        >
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/106609840-5f703680-65a9-11eb-9847-0f54daeb2a6d.png"
              width="100%"
            />
          </div>
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/106609847-60a16380-65a9-11eb-9492-3fc72d2732f3.png"
              width="100%"
            />
          </div>
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/106609851-61d29080-65a9-11eb-98f8-1b625babedd5.png"
              width="100%"
            />
          </div>
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/106609927-7a42ab00-65a9-11eb-80fc-25cbc99e4387.png"
              width="100%"
            />
          </div>
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/106609862-64cd8100-65a9-11eb-805e-c6d963267397.png"
              width="100%"
            />
          </div>
        </Carousel>
      </Modal>
      {data.map((it, i) => {
        return (
          <QuestionList
            key={i}
            data={it}
            count={dataSize - i - pageSize * (page)}
            getData={getData}
            setPage={setPage}
            pageSize={pageSize}
            page={page}
          />
        );
      })}
      <div style={{ marginBottom: "2rem" }} />
      <Pagination
        current={page+1}
        total={dataSize}
        defaultPageSize={pageSize}
        onChange={onPageChange}
        style={{ marginBottom: "1.5rem" }}
      />
      <Button onClick={FormHandler}>질문 추가</Button>
      <Modal
        title="질문추가"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[null, null]} //ok와 cancel 버튼을 없애기 위함
        width="40rem"
      >
        <Form
          form={form}
          onFinish={onFinishFunc}
          onFieldsChange={onValuesChange}
          autoComplete="off"
          style={{ width: "95%", padding: "0 5%" }}
        >
          <Form.Item
            label="질문"
            name="question"
            rules={[
              {
                required: true,
                message: "질문을 입력해주세요",
              },
            ]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="답변"
            name="questionAnswer"
            rules={[
              {
                required: true,
                message: "답변을 입력해주세요",
              },
            ]}
            required
          >
            <Input.TextArea 
                  initialvalues={data.questionAnswer} 
                  style={{height:"10rem", resize:"none"}}
            />  
          </Form.Item>
          <Form.Item
            label="학과"
            name="category1"
            rules={[
              {
                required: true,
                message: "학과를 설정해주세요",
              },
            ]}
            required
          >
            <Select>
                {dep.map(i => (i.department === "공통" || i.idx === Number(department)) ? <Option value={i.department}>{i.department}</Option>:null)}
            </Select>
          </Form.Item>
          <Form.Item 
            label="대분류" 
            name="category2"
            rules={[
              {
                required: true,
                message: "대분류를 설정해주세요",
              },
            ]}
            required
            >
              <Select>
                  {category.map(i => <Option value={i}>{i}</Option>)}
              </Select>
          </Form.Item>
          <Form.Item label="소분류" name="category3">
            <Input />
          </Form.Item>
          {/* <Form.Item label="카테고리 2" name="category4">
            <Input />
          </Form.Item>
          <Form.Item label="카테고리 3" name="category5">
            <Input />
          </Form.Item> */}
          <Form.Item label="답변링크" name="landingUrl">
            <Input />
          </Form.Item>
          {/* <Form.Item label="이미지링크" name="imageinfo">
            <Input />
          </Form.Item> */}
          <Form.Item colon={false} wrapperCol={{ offset: 11 }}>
            <Button
              icon={<CloudUploadOutlined />}
              htmlType="submit"
              style={{ margin: "1rem 1rem 0 1rem" }}
            >
              추가하기
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Question;
