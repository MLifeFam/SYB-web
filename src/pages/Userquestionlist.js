import React, { useEffect } from "react";
import { Form, Select, Input, Button, Row, Col, Divider, Modal } from "antd";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from "antd/lib/form";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  CloudUploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Userquestionlist = ({ data, getData, setPage, page }) => {
  const token = localStorage.getItem("user_token");
  const deptname = localStorage.getItem("dept_name");
  const header = {
    headers: {
      authorization: `${token}`,
    },
  };
  const confirmFunc = (formData) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteFunc(formData);
      }
    });
  };

  const onDeleteFunc = async (formData) => {
    const response = await axios
      .delete(`https://sjswbot.site/question/${data.idx}`,header, {widthCredentials:true})
      .catch((error) => {
        return toast.error("에러가 났어요!");
        console.log(error);
      });
    setPage(page);
    getData();
    toast.success("질문을 삭제했습니다!");
  };

  return (
    <>
      <Divider style={{ margin: "1vh 0" }} />
      <Row
        justify="start"
        style={{
          width: "90%",
          border: "1px solid lightgray",
          padding: "0.8rem 0",
          margin: "0.1rem 1rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        <Col
          flex={1}
          style={{ textAlign: "center", width: "15%", fontWeight: "bold" }}
        >
          {data.department === 11
          ?"공통질문"
          :deptname}
        </Col>
        <Col flex={8} style={{ marginLeft: "2rem", width: "50%" }}>
          {data.content}
        </Col>
        <Col flex={2} style={{ width: "15%" }}>
          {moment(data.updatedAt).format("LLL")}
        </Col>
        <Col flex={1}>
          <Button
            onClick={confirmFunc}
            type="primary"
            style={{ backgroundColor: "RGB(255,0,0,0.6)", border: "none"}}
          >
            삭제하기
          </Button>
        </Col>
      </Row>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Userquestionlist;
