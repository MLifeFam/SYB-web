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
import DataModifylist from "./DataModifyList";

const Option = Select.Option;
const { TextArea } = Input;

const DataModify = (props) => {
  const department = localStorage.getItem("department");
  const pageSize = parseInt(window.innerHeight / 50);
  let count = 0;
  const [size, setSize] = React.useState(0);
  // 한 페이지에 담을 데이터 수 (height에 따라 개수 다르게 설정)
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
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

  const PageRefresh = (count) => {
    const _data = data.slice(
      (count - 1) * pageSize,
      (count - 1) * pageSize + pageSize
    );
    // data page에 따라 자르는 작업

    window.scrollTo({ top: 0, behavior: "smooth" });
    // data 새로 불러올시 맨 위로 스크롤

    return _data.map((it, i) => {
      // 게시글 번호 계산

      return (
        <DataModifylist
          key={i}
          data={it}
          getData={getData}
          setPage={setPage}
          page={page}
        />
      );
    });
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const onPageChange = (pagenum) => {
    //pagenum은 1,2,3,4 식으로 전송 됨.
    setPage(pagenum);
    getData();
  };

  const getData = React.useCallback(async () => {
    const response = await axios.get(`https://mfam.site/fixRequest`);
    response.data.map((i, it) => {
      count += 1;
    });
    setData(response.data.reverse());
    //setData(response.data.values.reverse());
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

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
        <p>유저들의 데이터 수정 요청</p>
      </div>
      데이터에 오류가 있는 질문들의 수정 요청입니다.
      <div style={{ display: "flex", flexDirection: "row", margin: "5px 0" }}>
        <Link to="/question">
          <u>질문 수정페이지</u>
        </Link>{" "}
        에서 질문에 대한 답변을 수정해주세요 😊
      </div>
      {/* {data.map((it,i)=>{
        it.count=data.length-i;
        it.props=props;
        return(
            <QuestionList key = {i} data={it} getData={getData}/>
        )
      })} */}
      {PageRefresh(page)}
      <div style={{ marginBottom: "2rem" }} />
      <Pagination
        current={page}
        total={data.length}
        defaultPageSize={pageSize}
        onChange={onPageChange}
        style={{ marginBottom: "1.5rem" }}
      />
    </div>
  );
};

export default DataModify;
