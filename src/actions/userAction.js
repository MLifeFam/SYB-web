import { REGISTER_USER, LOGIN_USER } from "./types";
import axios from "axios";
import { request } from "../utils/axios";

export function registerUser(dataToSubmit) {
    const data = request("post", "/auth/join", dataToSubmit);
    return {
      type: REGISTER_USER,
      payload: data,
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
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER,
        });

        return axios.post('https://mfam.site/auth/login', dataToSubmit, {withCredentials: true}) // 쿠키데이터 받기위해서 withCredentials: true
        .then((res) => res)
        .catch((error) => error.response)
    };
  }