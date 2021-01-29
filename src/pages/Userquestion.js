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
  Pagination,
  Image,
  Carousel,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from "antd/lib/form";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import Userquestionlist from "./Userquestionlist";

const Option = Select.Option;
const { TextArea } = Input;

const Userquestion = (props) => {
  const department = localStorage.getItem("department");
  const pageSize = parseInt(window.innerHeight / 50);
  let count = 0;
  const [dataSize,setdataSize] = React.useState(0);
  const [size, setSize] = React.useState(0);
  // 한 페이지에 담을 데이터 수 (height에 따라 개수 다르게 설정)
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const token = localStorage.getItem("user_token");
  const header = {
    headers: {
      authorization: `${token}`,
    },
  };

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

    return data.map((it, i) => {
      // 게시글 번호 계산

      // if (it.department === "공통 질문" || it.department === department) {
        return (
          <Userquestionlist
            key={i}
            data={it}
            getData={getData}
            setPage={setPage}
            pageSize={pageSize}
            page={page}
          />
        );
      // }
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
    const response = await axios.get(`https://sjswbot.site/question/${department}?page=${page}&size=${pageSize}`,header, { widthCredentials: true });
    console.log(response);
    setdataSize(response.data.result.count);
    setData(response.data.result.rows);
  }, [page,setPage]);

  React.useEffect(() => {
    getData();
  }, [page,setPage]);

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
        }}
      >
        <p>유저들의 질문</p>
      </div>
      소융봇에서 제공하고 있지 않은 질문들에 대해서 유저들이 남긴 질문입니다.
      <div style={{ display: "flex", flexDirection: "row", margin: "10px 0 2rem" }}>
        <Link to="/question">
          <u>질문 수정페이지</u>
        </Link>{" "}
        에서 질문에 대한 답변을 올려주세요 😊
      </div>
      {/* {data.map((it,i)=>{
        it.count=data.length-i;
        it.props=props;
        return(
            <QuestionList key = {i} data={it} getData={getData}/>
        )
      })} */}
      {PageRefresh()}
      <div style={{ marginBottom: "2rem" }} />
      <Pagination
        current={page+1}
        total={dataSize}
        defaultPageSize={pageSize}
        onChange={onPageChange}
        style={{ marginBottom: "1.5rem" }}
      />
    </div>
  );
};

export default Userquestion;
