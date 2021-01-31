import React, { useEffect , useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  AutoComplete,
  Form,
  Select,
  notification,
  Input,
  message,
  Button,
  Carousel,
  Image,
  Upload,
  Divider,
} from "antd";
import ImageUploader from 'react-images-upload';
import { SearchOutlined,UploadOutlined } from "@ant-design/icons";
import { CloudUploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const openNotification = (type,comment) => {
  notification[type]({
    description: comment,
    placement: "bottomRight",
    duration: 2,
    width: "auto",
  });
};

const TimetableAdd = () => {
  const [form] = Form.useForm();
  const [data, getData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [classname,setClassname] = useState("");
  const token = localStorage.getItem("user_token");
  const header = {
    headers: {
      authorization: `${token}`,
    },
  };
  const meta = {
    title:'title 1',
    contents: 'contents 1',
  }

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append('img',fileList[0]);
    // fileList.forEach(file => formData.append('img',file));
    formData.classname=classname;

    for(let key in meta) {
      formData.append(key,meta[key]);
    }
    console.log(formData);
    await axios
      .post(`https://sjswbot.site/timetable/${classname}`, formData , header , { widthCredentials: true })
      .then((res)=>{
        if(res.status === 200){
            return Swal.fire({
              icon: "success",
              title: `등록되었습니다.`,
              showConfirmButton: false,
              width: "auto",
              timer: 1500,
            }).then(()=>{
              form.setFieldsValue({
                classname:"",
              });
            });
          }

      })
      .catch((err) => {
        openNotification('error','서버와의 에러가 발생했습니다.');
      });
  }

  const nameHandler = (e) => {
    setClassname(e.target.value);
  }

  const showModifier = () => {
    return (
      <div style={{ width: "100%", color: "gray" }}>
        {data.modifier}
        <br />
        {data.time}
      </div>
    );
  };

  useEffect(() => {
    form.setFieldsValue({
        classname:"",
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
      }}
    >
      <Carousel
        style={{ width: "50rem", height: "32rem", margin: "1rem 1rem 2rem" }}
      >
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99045727-22f9f380-25d5-11eb-8a36-a2135d9fb51d.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99045910-5fc5ea80-25d5-11eb-8f68-7b071a52350e.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106379500-cd70fe00-63ef-11eb-8c9e-18e2a21d6d65.png"
            width="100%"
          />
        </div>
      </Carousel>
      <Form
        form={form}
        onFinish={handleUpload}
        autoComplete="off"
        initialValues = {{img:fileList}}
        style={{ width: "40rem" }}
      >
        <Form.Item label="강의실" name="classname" required>
          <Input onChange={nameHandler} />
        </Form.Item>
        <Form.Item 
          label="시간표" 
          name="img" 
          required
        >
          <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText='이미지를 업로드해주세요'
                onChange = {(pictureFiles,pictureDataURLs)=>setFileList(pictureFiles)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage
          />
        </Form.Item>
        <Divider />
        {showModifier()}
        <Form.Item colon={false}>
            <center>
                <Button htmlType="submit">
                    등록하기
                </Button>
            </center>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TimetableAdd;
