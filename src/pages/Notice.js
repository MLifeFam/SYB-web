import React from "react";
import axios from "axios";
import { AutoComplete, Form, Select, Input, Button,Carousel,Image } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUploadOutlined } from "@ant-design/icons"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const Option = Select.Option;
const { TextArea } = Input;

const Notice = () => {
    const [form] = Form.useForm();
    const department = localStorage.getItem('department');
    const [data, setData] = React.useState([]);
    const [isDisable, setDisable] = React.useState(true);
    const getData = React.useCallback(async () => {
      const response = await axios.get(`https://mfam.site/notice/${department}`);
      console.log(response);
      setData(response.data);

      form.setFieldsValue({
        department: response.data[0].department,
        link: response.data[0].link,
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
        title: '수정하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네',
        cancelButtonText:'아니요'
      }).then((result) => {
        if (result.isConfirmed) {
          onFinish(formData);
        }
      });
    }
  
    const onFinish = async (formData) => {
      const response = await axios
      .put(`https://mfam.site/notice/${formData.department}`, formData)
      .then((res)=>{
        if(res.status===200){
          return Swal.fire({
            icon: 'success',
            title: '수정 완료',
            showConfirmButton: false,
            width:'20rem',
            timer: 1500
          })
        }
      })
      .catch((err)=>{
        toast.error("서버와의 에러가 발생했습니다!");
      });
    };

    React.useEffect(() => {
      getData();
      
    }, [department, getData]);

    return (
      <div style={{margin: "3% 10%", padding:"1% 0%", display:"flex",alignItems:"center", flexDirection:"column", background:"white", borderRadius:"0.5rem",border:"2px solid lightgray"}}>
        <div style={{ textAlign: "center", fontSize: "30px", fontFamily:"Gothic A1" }}>
          <p>학과 공지 링크 수정 페이지</p>
        </div>
        <Carousel 
        style={{width:"50rem",height:"30rem",border:"2px groove lightgray",borderRadius:"1rem",margin:"1rem 1rem 3rem"}}
        >
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/98467522-22e6a600-2219-11eb-84e6-4d529bfc9082.png"
              width="85%"
              style={{marginTop:"3rem"}}
            />
          </div>
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/98467524-24b06980-2219-11eb-82e6-6dcf07cbda88.png"
              width="85%"
              style={{marginTop:"3rem"}}
            />
          </div>
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/98467526-25e19680-2219-11eb-9656-25c06150ecf6.png"
              width="85%"
              style={{marginTop:"3rem"}}
            />
          </div>
          <div>
            <Image
              src="https://user-images.githubusercontent.com/51112542/98467527-2712c380-2219-11eb-934e-4ff4baf15713.png"
              width="85%"
              style={{marginTop:"3rem"}}
            />
          </div>
      </Carousel>
        <Form form={form} onFinish={confirmFunc} onFieldsChange={onValuesChange} autoComplete="off" style={{width:"30rem"}}>
        <Form.Item label="학과" name="department" value={department} required>
          <Input readOnly={true}/>
        </Form.Item>
        <Form.Item label="링크" name="link" required>
          <Input />
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ offset: 9 }}>
          <Button type="primary" icon ={<CloudUploadOutlined />} htmlType="submit">
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
  
export default Notice;
