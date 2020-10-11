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
    axios.defaults.headers.common['Authorization'] = accessToken;

    return {
      type:LOGIN_SUCCESS,
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
    return (dispatch) =>{

    return axios.get('https://mfam.site/auth/check',header ,{widthCredentials:true})
      .then((res)=> {
        dispatch({
          type:AUTH_SUCCESS,
        })
      })
      .catch((error)=> 
      {
        dispatch({
          type:AUTH_FAILED,
        })
      });
    };
  }

