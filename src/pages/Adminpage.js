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
} from "antd";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from "antd/lib/form";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Option = Select.Option;
const { TextArea } = Input;

const AdminPage = (props) => {
  const name = localStorage.getItem("username");
  const role = localStorage.getItem("role");
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

  return (
      <>
      {role === "2" ? (
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
            <p> 관리자 페이지 </p>
        </div>
        <div
            style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 2rem",
            }}
        >
            관리자페이지 입니다.
        </div>
        </div>
      ):
      <p>관리자만 접근 가능한 페이지 입니다.</p>
      }
      </>
  );
};

export default AdminPage;
