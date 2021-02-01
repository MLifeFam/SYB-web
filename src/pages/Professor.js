import React, { useEffect,useState} from "react";
import moment from "moment";
import axios from "axios";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  Button,
  Carousel,
  notification,
  Image,
  Divider,
  Tabs,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CloudUploadOutlined } from "@ant-design/icons";
import ProfessorAdd from './ProfessorAdd';
import ProfessorModify from './ProfessorModify';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const openNotification = (type,comment) => {
  notification[type]({
    description: comment,
    placement: "bottomRight",
    duration: 1.5,
    width: "auto",
  });
};

const { TabPane } = Tabs;

const Professor = () => {
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
        <p>교수님 연구실 페이지</p>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="교수님 데이터 추가" key="1">
          <ProfessorAdd/>
        </TabPane>
        <TabPane tab="교수님 데이터 수정/삭제" key="2">
          <ProfessorModify/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Professor;
