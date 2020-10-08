import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../actions/userAction";

export default function (Component, option , adminRoute = null){
    //option
    //null => 아무나 출입 가능
    //true => 로그인한 유저만 출입 가능
    //false => 로그인한 유저는 출입 불가능

    function AuthCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(authUser()).then((res) =>{
                console.log("AUTH:"+res);

                if(option){
                    props.history.push('/');
                }

            });
        },[]);

        return <Component/>;
    }

    return AuthCheck;
}
