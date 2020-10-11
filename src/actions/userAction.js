import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER ,REGISTER_ERROR} from "./types";
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

  export function logoutUser(){
    return (dispatch) => {
      dispatch({
          type: LOGOUT_USER,
      });

      return axios.get('https://mfam.site/auth/logout', {widthCredentials:true})
      .then((res)=>res)
      .catch((error)=> error.response)
    };
  }

  export function authUser() {
    return (dispatch) => {
      dispatch({
          type: AUTH_USER,
      });

      return axios.post('https://mfam.site/auth/join', {widthCredentials:true})
      .then((res)=>res)
      .catch((error)=> error.response)
    };
  }