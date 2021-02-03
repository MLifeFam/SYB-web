import React from "react";
import moment from "moment";
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
  Tabs,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import FallbackList from "./Fallbacklist";
import styled from "styled-components";
import { FormInstance } from "antd/lib/form";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Option = Select.Option;
const { TextArea } = Input;

const AdminRequest = (props) => {
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");
  const pageSize = parseInt(window.innerHeight / 70);
  const [dataSize,setdataSize] = React.useState(0);
  let count = 0;
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
    // const _data = data.slice(
    //   (count - 1) * pageSize,
    //   (count - 1) * pageSize + pageSize
    // );
    // data page에 따라 자르는 작업

    window.scrollTo({ top: 0, behavior: "smooth" });
    // data 새로 불러올시 맨 위로 스크롤

    return data.map((it, i) => {
      // 게시글 번호 계산

      return (
        <FallbackList
          key={i}
          data={it}
          count={dataSize - i - pageSize * (page)}
          getData={getData}
          setPage={setPage}
          pageSize={pageSize}
          page={page}
        />
      );
    });
  };

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const onPageChange = (pagenum) => {
    setPage(pagenum-1);
  };

  const getData = React.useCallback(async () => {
    const response = await axios.get(`https://sjswbot.site/adminRequest?page=${page}&size=${pageSize}`, header, { widthCredentials: true });
    setdataSize(response.data.result.count);
    setData(response.data.result.rows);
    PageRefresh();
    // setData(response.data.values.reverse());
  },[page,setPage]);

  React.useEffect(() => {
    getData();
  }, [page,setPage]);

  return (
      <>
      {role === "2" ? (
        <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
        }}
        >
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
          showSizeChanger={false}
          onChange={onPageChange}
          style={{ marginBottom: "1.5rem" }}
        />
      </div>
      ):
      <p>관리자만 접근 가능한 페이지 입니다.</p>
      }
      </>
  );
};

export default AdminRequest;
