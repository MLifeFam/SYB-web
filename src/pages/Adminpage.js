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
  const department = localStorage.getItem("department");

  return (
      <>
      {name === ("이종민" || "허균" || "홍은호") ? (
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
