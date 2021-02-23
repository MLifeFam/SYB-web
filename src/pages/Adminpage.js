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
import AdminRequest from "./AdminRequest";
import Fallback from "./Fallback";
import styled from "styled-components";
import { FormInstance } from "antd/lib/form";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Option = Select.Option;
const { TextArea } = Input;
const { TabPane } = Tabs;

const AdminPage = (props) => {
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");

  return (
      <>
      {role === "1" ? (
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
          <p>관리자페이지</p>
        </div>
        <p>사용자 폴백블록은 챗봇내에서 인식하지 못한 블록의 발화를,</p>
        <p>관리자 요청사항은 챗봇에서 사용자들이 관리자에게 보낸 요청사항의 리스트를 보여줍니다.</p>
        <Tabs defaultActiveKey="1" style={{width:"90%"}}>
          <TabPane tab="사용자 폴백블록" key="1">
            <Fallback/>
          </TabPane>
          <TabPane tab="관리자 요청사항" key="2">
            <AdminRequest/>
          </TabPane>
        </Tabs>
      </div>
      ):
      <p>관리자만 접근 가능한 페이지 입니다.</p>
      }
      </>
  );
};

export default AdminPage;
