import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../actions/userAction";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export default function (Component, option , adminRoute = null){
    //option
    //null => 아무나 출입 가능
    //true => 로그인한 유저만 출입 가능
    //false => 로그인한 유저는 출입 불가능

    function AuthCheck(props){
        const dispatch = useDispatch();
        let _data={};
        useEffect(() =>{
        dispatch(authUser()).then((res) =>{
            if(!res){
                Swal.fire({
                    icon: 'error',
                    title:'로그인이 필요합니다',
                    showConfirmButton: true,
                    width:'25rem',
                    timer: 2000,
                }).then(props.history.push("/"));
            }
            else{
                _data = Object.assign(_data,res);
            }
        });
    },[]);
            return <Component data={_data}/>
    }

    return AuthCheck;
}
