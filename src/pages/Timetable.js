import React, { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  Button,
  Carousel,
  Image,
  Divider,
  Tabs,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import TimetableAdd from './TimetableAdd';
import TimetableModify from './TimetableModify';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const { TabPane } = Tabs;

const Timetable = () => {
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
        <p>강의실 시간표 수정 페이지</p>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="강의실 시간표 추가" key="1">
          <TimetableAdd/>
        </TabPane>
        <TabPane tab="강의실 시간표 수정/삭제" key="2">
          <TimetableModify/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Timetable;
