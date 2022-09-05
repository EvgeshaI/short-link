import React from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {Form} from "./Form";
import {loginAsync} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const {
        isAuth
    } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const login = (username: string, password: string) => {
        dispatch(loginAsync(username,  password))
    }
    if(isAuth){
        navigate("/content")
    }
    return (
        <>
            <Form login={true} onSubmitButton={login}/>
        </>
    )
}