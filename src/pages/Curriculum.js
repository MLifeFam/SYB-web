import React from "react";
import moment from "moment";
import axios from "axios";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  Button,
  notification,
  Carousel,
  Image,
  Divider,
} from "antd";
import ImageUploader from 'react-images-upload';
import { CloudUploadOutlined } from "@ant-design/icons";
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

const Option = Select.Option;
const { TextArea } = Input;

const Curriculum = () => {
  const [form] = Form.useForm();
  const department = localStorage.getItem("department");
  const deptname = localStorage.getItem("dept_name");
  const [data, setData] = React.useState([]);
  const [fileList, setFileList] = React.useState([]);
  const [isDisable, setDisable] = React.useState(true);
  const getData = React.useCallback(async () => {
    const response = await axios.get(
      `https://sjswbot.site/curriculum/${department}`
    );
    console.log(response);
    setData({
      modifier: response.data.result.User.username,
      time: moment(response.data.result.updatedAt).format("LLL"),
    });

    form.setFieldsValue({
      department: deptname,
      link: response.data.result.link,
    });
  }, [department]);

  const onChangeSelectFunc = React.useCallback((e) => {
    console.log(form.getFieldValue("department"));
  }, []);

  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue);
  };

  const confirmFunc = (formData) => {
    Swal.fire({
      title: "수정하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        onFinish(formData);
      }
    });
  };

  const onFinish = async (formData) => {
    // formData.modifier = localStorage.getItem("username");
    // formdata에 userid 추가
    const token = localStorage.getItem("user_token");
    const header = {
      headers: {
        authorization: `${token}`,
      },
    };
    
    const response = await axios
      .put(`https://sjswbot.site/curriculum/${department}`, formData , header, { widthCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return Swal.fire({
            icon: "success",
            title: "수정 완료",
            showConfirmButton: false,
            width: "20rem",
            timer: 1500,
          }).then(()=>getData());
        }
      })
      .catch((err) => {
        return openNotification('error', '서버와의 에러가 발생했습니다.');
      });
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [department, getData]);

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
        <p>{deptname} 교과과정 수정 페이지</p>
      </div>
      <Carousel
        style={{ width: "50rem", height: "32rem", margin: "1rem 1rem 2rem" }}
      >
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106897492-59f42700-6736-11eb-89ba-662f61ecc7ad.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106897503-5bbdea80-6736-11eb-864b-55fa1e16fd18.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/107118637-77a3c680-68c5-11eb-8863-fc4fff1956da.png"
            width="100%"
          />
        </div>
      </Carousel>
      <Form
        form={form}
        onFinish={confirmFunc}
        onFieldsChange={onValuesChange}
        autoComplete="off"
        style={{ width: "40rem" }}
      >
        <Form.Item label="학과" name="department" value={department} required>
          <Input readOnly={true} />
        </Form.Item>
        <Form.Item label="링크" name="link" required>
          <Input />
        </Form.Item>
        <Divider />
        <p style={{ width: "100%", color: "gray" }}>
          {data.modifier} 조교님
          <br />({data.time})
        </p>
        <Form.Item colon={false} wrapperCol={{ offset: 11 }}>
          <Button icon={<CloudUploadOutlined />} htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Curriculum;