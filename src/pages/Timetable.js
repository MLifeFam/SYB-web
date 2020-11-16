import React, { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  Button,
  Carousel,
  Image,
  Divider,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getDefaultNormalizer } from "@testing-library/react";

const MySwal = withReactContent(Swal);

const Timetable = () => {
  const name = localStorage.getItem("username");
  const [list, setlist] = React.useState([]);
  const [form] = Form.useForm();
  const [data, setData] = React.useState({});
  const [inputValue, setInputValue] = React.useState("");
  const [nameCheck, setNameCheck] = React.useState(false);

  const confirmFunc = (formData) => {
    if (nameCheck === false) {
      return toast.error("강의실 이름을 Seacrh 해주세요!");
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

  const onFinishFunc = async (data) => {
    data.modifier = name;
    console.log(data);
    const response = await axios
      .put(`https://mfam.site/timetable/${inputValue}`, data)
      .then((res) => {
        if (res.status === 200) {
          return Swal.fire({
            icon: "success",
            title: "수정 완료",
            showConfirmButton: false,
            width: "20rem",
            timer: 1500,
          });
        }
        onSearchFunc();
      })
      .catch((err) => {
        toast.error("서버와의 에러가 발생했습니다!");
      });
  };

  const onChangeFunc = (name) => {
    setNameCheck(false);
    setInputValue(name);
  };

  const onSearchFunc = async () => {
    let value = inputValue.replace(/(\s*)/g, ""); // 띄어쓰기 제거
    if (value.length < 3) {
      return toast.error("존재하지 않는 강의실입니다.");
    }
    const response = await axios
      .get(`https://mfam.site/timetable/${value}`)
      .catch((error) => {
        toast.error("에러가 났어요!");
      });

    console.log(response);
    if (response.data.length === 0) {
      return toast.error("존재하지 않는 강의실입니다.");
    } else {
      toast.success("강의실 정보를 성공적으로 불러왔습니다.");
      setNameCheck(true);
      setData({
        modifier: response.data[0].modifier + " 조교님",
        time:
          "(" +
          moment(response.data[0].time).add(9, "hours").format("LLL") +
          ")",
      });
      form.setFieldsValue({
        link: response.data[0].link,
      });
    }
  };

  useEffect(() => {
    let p_list = [];
    axios.get(`https://mfam.site/timetable/`).then((res) => {
      res.data.map((v, i) => {
        p_list.push({ value: v.classname });
      });
    });

    setlist(p_list);
  }, []);

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
      <Carousel
        style={{ width: "50rem", height: "32rem", margin: "1rem 1rem 2rem" }}
      >
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99046546-3eb1c980-25d6-11eb-91d1-9e65182a72cb.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99046550-3fe2f680-25d6-11eb-8f35-49df97a88419.png"
            width="100%"
          />
        </div>
        <div>
          <Image
            src="https://user-images.githubusercontent.com/51112542/99046554-41142380-25d6-11eb-8be4-b10796d051f3.png"
            width="100%"
          />
        </div>
      </Carousel>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0 0 2rem 0",
          width: "30rem",
        }}
      >
        <p style={{ width: "5rem" }}>강의실:</p>
        <AutoComplete
          style={{ width: "100%", marginRight: "1rem" }}
          options={list}
          placeholder="강의실을 입력해주세요"
          filterOption={(input, option) => option.value.indexOf(input) !== -1}
          onChange={onChangeFunc}
        />
        <Button icon={<SearchOutlined />} onClick={onSearchFunc}>
          Search
        </Button>
      </div>
      <Form
        form={form}
        onFinish={confirmFunc}
        autoComplete="off"
        style={{ width: "30rem" }}
      >
        <Form.Item label="링크" name="link">
          <Input />
        </Form.Item>
        <Divider />
        <p style={{ width: "100%", color: "gray" }}>
          {data.modifier}
          <br />
          {data.time}
        </p>
        <Form.Item colon={false} wrapperCol={{ offset: 11 }}>
          <Button icon={<CloudUploadOutlined />} htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
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
      </Form>
    </div>
  );
};

export default Timetable;
