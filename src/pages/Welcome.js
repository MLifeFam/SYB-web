import React , { Component } from 'react';
import axios from "axios";
import { AutoComplete, Form, Select, Input, Button,Carousel,Image } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import oc from 'open-color';

class Welcome extends Component{
    render(){
        return(
            <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray",height:"30rem"}}>
                <div style={{ textAlign: "center", fontSize: "30px", margin:"0 0 2rem 0" , fontFamily:"Gothic A1"}}>
                관리자 공지사항
                </div>
          </div>
        );
    }
  }

export default Welcome;
