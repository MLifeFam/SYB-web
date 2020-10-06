import { REGISTER_USER, LOGIN_USER } from "./types";
import axios from "axios";
import { request } from "../utils/axios";

const USER_URL = "/auth/login";

export function registerUser(dataToSubmit) {
    const data = request("post", USER_URL, dataToSubmit);
    return {
      type: REGISTER_USER,
      payload: data,
    };
  }
  
//   export function loginUser(dataToSubmit) {
//     const data = request("post", USER_URL, dataToSubmit);

//     return {
//         type: LOGIN_USER,
//         payload: data,
//     };
//   }
  
  export function loginUser(dataToSubmit) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });

        return axios.post('https://mfam.site/auth/login', dataToSubmit)
        .then((response) => response.data)
        .catch((error) => console.log(error));
    };
  }