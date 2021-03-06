import React, { useEffect } from "react";
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
import { SearchOutlined } from "@ant-design/icons";
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

const ProfessorModify = () => {
  const [list, setlist] = React.useState([]);
  const [form] = Form.useForm();
  const [data, setData] = React.useState({});
  const [inputValue, setInputValue] = React.useState("");
  const [nameCheck, setNameCheck] = React.useState(false);
  const token = localStorage.getItem("user_token");
  const header = {
    headers: {
      authorization: `${token}`,
    },
  };

  const onDeleteFunc = async () => {
    if (nameCheck === false) {
        return openNotification('error', '성함을 입력 후 search 버튼을 눌러주세요');
    }

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
        axios.delete(`https://sjswbot.site/professor/${inputValue}`, header, { widthCredentials: true })
        .then(()=>
        Swal.fire({
            icon: "success",
            title: "삭제되었습니다.",
            showConfirmButton: false,
            width: "auto",
            timer: 1500,
          }).then(()=>{
            form.setFieldsValue({
              classPosition: "",
              phoneNumber: "",
              email: "",
            });
          })
        );
      }
    });
  };

  const onFinishFunc = async (_data) => {
    console.log(inputValue);
    const response = await axios
      .put(`https://sjswbot.site/professor/${inputValue}`, _data , header, { widthCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return Swal.fire({
            icon: "success",
            title: "수정되었습니다.",
            showConfirmButton: false,
            width: "auto",
            timer: 1500,
          }).then(()=>
            onSearchFunc()
          );
        }
      })
      .catch((err) => {
        
      });
  };

  const confirmFunc = (formData) => {
    if (nameCheck === false) {
        return openNotification('error', '성함을 입력 후 search 버튼을 눌러주세요');
    }

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
        onFinishFunc(formData);
      }
    });
  };

  const onChangeFunc = (name) => {
    setNameCheck(false);
    setInputValue(name);
  };

  const showModifier = () => {
    return (
      <p style={{ width: "100%", color: "gray" }}>
        {data.modifier}
        <br />
        {data.time}
      </p>
    );
  };

  const getData = React.useCallback(async () => {

    const response = await axios
      .get(`https://sjswbot.site/professor/${inputValue}`)
      .catch((error) => {
      });
    console.log(response);

    if (!response.data.result) {
      return openNotification('error', '존재하지 않는 이름입니다.');
    }
    openNotification('success','데이터를 성공적으로 불러왔습니다.');
    setNameCheck(true);
    setData({
      modifier: response.data.result.User.username + " 조교님",
      time: moment(response.data.result.updatedAt).format("LLL"),
    });

    form.setFieldsValue({
      classPosition: response.data.result.classPosition,
      phoneNumber: response.data.result.phoneNumber,
      email: response.data.result.email,
    });
  }, []);

  const onSearchFunc = async () => {
    let name = inputValue;
    if (name.length < 2) {
        return openNotification('error', '존재하지 않는 이름입니다.');
    }
    const response = await axios
      .get(`https://sjswbot.site/professor/${name}`)
      .catch((error) => {
      });

    if (!response.data.result) {
      return openNotification('error', '존재하지 않는 이름입니다.');
    }
    openNotification('success','데이터를 성공적으로 불러왔습니다.');
    setNameCheck(true);
    setData({
      modifier: response.data.result.User.username + " 조교님",
      time: moment(response.data.result.updatedAt).format("LLL"),
    });

    form.setFieldsValue({
      classPosition: response.data.result.classPosition,
      phoneNumber: response.data.result.phoneNumber,
      email: response.data.result.email,
    });
  };

  useEffect(() => {
    let p_list = [];
    axios.get(`https://sjswbot.site/professor/list`).then((res) => {
    console.log(res.data.result);
    res.data.result.map((v, i) => {
        p_list.push({ value: v.name });
    });
    })
    setlist(p_list);
    console.log(p_list);
  },[]);

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
            src="https://user-images.githubusercontent.com/51112542/106898715-e18e6580-6737-11eb-9b89-aaed3a8979cb.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106898719-e3582900-6737-11eb-8931-05536127a510.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/106898725-e4895600-6737-11eb-95d4-774d237a14e5.png"
            width="100%"
          />
        </div>
      </Carousel>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0 0 2rem 0",
          width: "40rem",
          height:"auto",
        }}
      >
        <p style={{ width: "5rem" }}>성함:</p>
        <AutoComplete
          style={{ width: "100%", marginRight: "1rem"}}
          options={list}
          placeholder="교수님 성함을 입력해주세요"
          filterOption={(input, option) => option.value.indexOf(input) === 0}
          onChange={onChangeFunc}
        />
        {/* <Input style={{ margin: "0 4% 0 0" }} onChange={onChangeFunc} /> */}
        <Button icon={<SearchOutlined />} onClick={onSearchFunc}>
          Search
        </Button>
      </div>
      <Form
          form={form}
          onFinish={confirmFunc}
          autoComplete="off"
          style={{ width: "40rem" }}
        >
          {
            nameCheck === true
            ? <>
              <Form.Item label="연구실" name="classPosition" required>
                <Input />
              </Form.Item>
              <Form.Item label="전화번호" name="phoneNumber" required>
                <Input />
              </Form.Item>
              <Form.Item label="이메일" name="email" required>
                <Input />
              </Form.Item>
              
            </>
            :null
          }
          <Divider />
          {
            nameCheck === true
            ?showModifier()
            :null
          }
          <Form.Item>
              <center>
                  <Button icon={<CloudUploadOutlined />} htmlType="submit" style={{float:'left', marginLeft:'12rem'}}>
                      수정하기
                  </Button>
                  <Button icon={<CloudUploadOutlined />} onClick={onDeleteFunc} style={{float:'right',marginRight:'12rem'}}>
                      삭제하기
                  </Button>
              </center>
          </Form.Item>
        </Form>
    </div>
  );
};

export default ProfessorModify;
