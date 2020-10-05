import {
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes';

export function loginRequest(userid,password){
    return (dispatch) => {
        dispatch(login());

        // API 요청
        return Axios.post('',{userid,password})
        .then((response) => {
            // Succeed
            dispatch(loginSuccess(userid));
        }).catch((error)=>{
            // Failed
            dispatch(loginFailure());
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(userid){
    return {
        type: AUTH_LOGIN_SUCCESS,
        userid
    };
}

export function loginFailure(){
    return {
        type: AUTH_LOGIN_FAILURE
    };
}