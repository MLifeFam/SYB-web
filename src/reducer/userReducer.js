import { REGISTER_USER, LOGIN_USER,LOGOUT_USER,REGISTER_ERROR,AUTH_USER,LOGIN_SUCCESS,AUTH_SUCCESS,AUTH_FAILED } from "../actions/types";

const defaultState = {
  loggedIn : false,
  user : {},
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, loggedIn:false, user:{}};
    case REGISTER_ERROR:
        return { ...state, loggedIn:false, user:{}};
    case LOGIN_USER:
      return { ...state, loggedIn:true, user:{...action.payload} };
    case LOGOUT_USER:
      return { ...state, loggedIn:false, user:{} };
    case AUTH_USER:
      return {...state,loggedIn:true,user:{...action.payload}};
    // case AUTH_FAILED:
    //   return {...state,loggedIn:false,user:{}};
    default:
      return state;
  }
}