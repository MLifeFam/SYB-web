import React, { useEffect ,useState} from "react";
import axios from "axios";
import moment from "moment";
import {
  AutoComplete,
  Form,
  Select,
  Input,
  notification,
  Button,
  Carousel,
  Image,
  Divider,
} from "antd";
import ImageUploader from 'react-images-upload';
import { SearchOutlined } from "@ant-design/icons";
import { CloudUploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getDefaultNormalizer } from "@testing-library/react";

const MySwal = withReactContent(Swal);
const openNotification = (type,comment) => {
  notification[type]({
    description: comment,
    placement: "bottomRight",
    duration: 2,
    width: "auto",
  });
};

const TimetableModify = () => {
  const name = localStorage.getItem("username");
  const [list, setlist] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [nameCheck, setNameCheck] = useState(false);
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

  const onDeleteFunc = async () => {
    if (nameCheck === false) {
        return openNotification('error', '강의실을 입력 후 Search 버튼을 눌러주세요');
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
        axios.delete(`https://sjswbot.site/timetable/${inputValue}`, header, { widthCredentials: true })
        .then(()=>
        Swal.fire({
            icon: "success",
            title: "삭제되었습니다.",
            showConfirmButton: false,
            width: "auto",
            timer: 1500,
          }).then(()=>{
            setInputValue("");
            setData([]);
            setNameCheck(false);
          })
        );
      }
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append('img',fileList[0]);
    // fileList.forEach(file => formData.append('img',file));

    for(let key in meta) {
      formData.append(key,meta[key]);
    }
    console.log(formData);
    await axios
      .put(`https://sjswbot.site/timetable/${inputValue}`, formData , header , { widthCredentials: true })
      .then((res)=>{
        if(res.status === 200){
            return Swal.fire({
              icon: "success",
              title: `등록되었습니다.`,
              showConfirmButton: false,
              width: "auto",
              timer: 1500,
            }).then(()=>{
              getData();
            }
            );
          }
      })
      .catch((err) => {
        openNotification('error','서버와의 에러가 발생했습니다.');
      });
  }

  const confirmFunc = (formData) => {
    if (nameCheck === false) {
      return openNotification('error', '강의실을 입력 후 Search 버튼을 눌러주세요');
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
        handleUpload();
      }
    });
  };

  const onChangeFunc = (name) => {
    setNameCheck(false);
    setInputValue(name);
  };

  const getData = React.useCallback(async () => {
    const response = await axios
    .get(`https://sjswbot.site/timetable/${inputValue}`)
    .catch((error) => {
      openNotification('error', '서버와의 에러가 발생했습니다.');
    });

    console.log(response);
    if (!response.data.result) {
      return openNotification('error', '존재하지 않는 강의실 입니다.');
    } else {
      openNotification('success', '강의실 정보를 성공적으로 불러왔습니다.');
      setNameCheck(true);
      setData({
        modifier: response.data.result.User.username + " 조교님",
        time:
        "(" + moment(response.data.result.time).format("LLL") + ")",
        link: response.data.result.link,
      });
    }
  }, []);

  const onSearchFunc = async () => {
    let value = inputValue.replace(/(\s*)/g, ""); // 띄어쓰기 제거
    if (value.length < 1) {
      return openNotification('error', '강의실을 입력 후 Search 버튼을 눌러주세요');
    }
    const response = await axios
      .get(`https://sjswbot.site/timetable/${value}`)
      .catch((error) => {
        openNotification('error', '서버와의 에러가 발생했습니다.');
      });

    console.log(response);
    if (!response.data.result) {
      return openNotification('error', '존재하지 않는 강의실 입니다.');
    } else {
      openNotification('success', '강의실 정보를 성공적으로 불러왔습니다.');
      setNameCheck(true);
      setData({
        modifier: response.data.result.User.username + " 조교님",
        time:
        "(" + moment(response.data.result.time).format("LLL") + ")",
        link: response.data.result.link,
      });
    }
    // getData();
  };

  useEffect(() => {
    let p_list = [];
    axios.get(`https://sjswbot.site/timetable/list`).then((res) => {
    console.log(res.data.result);
    res.data.result.map((v, i) => {
        p_list.push({ value: v.classname });
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
          width: "40rem",
        }}
      >
        <p style={{ width: "6rem" }}>강의실:</p>
        <AutoComplete
          name="classname"
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
        style={{ width: "40rem" }}
      >
        {
          data.link?
          <Form.Item
            label = "현재 시간표"
          >
            <Image src={"https://sjswbot.site"+data.link} style={{maxWidth:"40rem"}}></Image>
          </Form.Item>
          :null
        }
        {
          data.link?
          <Form.Item 
            label="수정 시간표" 
            name="img" 
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
          :null
        }   

        <Divider />
        {
          data.modifier
          ?<p style={{ width: "100%", color: "gray",cursor:"pointer" }}>
            {data.modifier}
            <br />
            {data.time}
          </p>
          :null
        }
        <Form.Item style={{margin:'3rem 0 0'}}>
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

export default TimetableModify;
