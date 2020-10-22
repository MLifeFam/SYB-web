import React from "react";
import { Form, Select, Input, Button,Row, Col, Divider } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { FormInstance } from 'antd/lib/form';
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"

const Option = Select.Option;
const { TextArea } = Input;

const List = ({data}) => {
  return (
    <>
    <Divider orientation="left">{data[0]}</Divider>
    <Row justify="start" style={{width:"100%"}}>
      <Col flex={9} style={{marginLeft:"2rem"}}>
        {data[6]}
      </Col>
      <Col flex={1}>
        {data[7]}
      </Col>
    </Row>
    </>
  );
};

const Question = () => {
  const [data, setData] = React.useState([]);
    const getData = React.useCallback(async () => {
      const response = await axios.get(`https://mfam.site/knowledgePlus/kakao`);
      setData(response.data.values);
    }, []);
    React.useEffect(() => {
      getData();
    }, []);

  return (
    <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontFamily:"Gothic A1"
        }}
      >
        <p >질문 수정 페이지</p>
      </div>
      {data.reverse().map((it,i)=>{
        return(
            <List key = {it[0]} data={it}/>
        )
      })}
      <div style={{marginBottom:"2rem"}}/>
    </div>
  );
};

export default Question;
