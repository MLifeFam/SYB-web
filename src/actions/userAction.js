import { 
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAILED,
} from "./types";
import axios from "axios";
import { request } from "../utils/axios";

export function registerUser(dataToSubmit) {
        return (dispatch) => {
          dispatch({
              type: REGISTER_USER,
          });
          
          return axios.post('https://mfam.site/auth/signup', dataToSubmit)
          .then((response) => response)
          .catch((error) => error.response )
      };
  }
  
  // export function loginUser(dataToSubmit) {
  //   const data = request("post", "/auth/login", dataToSubmit);
  //   return {
  //       type: LOGIN_USER,
  //       payload: data,
  //   };
  // }

  export function LoadQuestion(){
    return axios.get(`https://mfam.site/knowledgePlus`)
    .then((response => response.data.reverse()))
    .catch((error)=>error.response);
  }
  
  export function loginUser(dataToSubmit) {
    const uid = dataToSubmit.userid;

    return (dispatch) => {
        dispatch({
            type: LOGIN_USER,
            payload:uid,
        });

        return axios.post('https://mfam.site/auth/login', dataToSubmit)
        .then((response) => response)
        .catch((error) => error.response)
    };
  }

  export function loginSuccess(accessToken){
    localStorage.setItem('user_token', accessToken);
    //axios.defaults.headers.common['Authorization'] = accessToken;

    return (dispatch) =>{

    dispatch({
      type:LOGIN_SUCCESS,
    });
   }
  }

  export function logoutUser(){
    return (dispatch) => {
      dispatch({
          type: LOGOUT_USER,
      });
    };
  }

  export function authUser(props) {
    const token = localStorage.getItem('user_token');
    const header = {
      headers:{
      "authorization":`Bearer ${token}`
      }
    }

    console.log(header);

    return (dispatch) =>{
  
    return axios.get('https://mfam.site/auth/check',header ,{widthCredentials:true})
      .then((res)=> {
        dispatch({
          type:AUTH_SUCCESS,
        })
        console.log(res.data.data);

        const department = dept(res.data.data.department);

        localStorage.setItem('userid',res.data.data.userid);
        localStorage.setItem('username',res.data.data.username);
        localStorage.setItem('department',department);

        return res.data.data;
      })
      .catch((error)=> 
      {
        dispatch({
          type:AUTH_FAILED,
        })
      });
    };
  }

  function dept(num){

    switch(num){
      case 0:
        return "컴퓨터공학과";
        break;
      case 1:
        return "소프트웨어학과";
        break;
      case 2:
        return "정보보호학과";
        break;
      case 3:
        return "데이터사이언스학과";
        break;   
      case 4:
        return "지능기전공학부";
        break;
      case 5:
        return "창의소프트학부";
        break;
      default:
        return "";
    }

  }
