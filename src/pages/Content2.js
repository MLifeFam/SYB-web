import React from "react";
import { Form, Select, Input, Button } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content2 = () => {
    const [data, setData] = React.useState([]);
    const getData = React.useCallback(async () => {
      const response = await axios.get("http://mfam.site:3001/curriculum");
      console.log(response);
      setData(response.data);
    }, []);
    React.useEffect(() => {
      getData();
      // eslint-disable-next-line
    }, []);
    return (
      <div style={{ margin: "3% 10%", display:"flex",alignItems:"center", flexDirection:"column"}}>
        <div style={{ textAlign: "center", fontSize: "30px" }}>
          교과 과정 링크 수정 페이지
        </div>

      </div>
    );
  };
  
export default Content2;
