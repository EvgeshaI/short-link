import React from "react";
import {Form} from "./Form";
import {useAppDispatch} from "../../store";
import {signUpAsync} from "../../store/authSlice";


export const Registration = () => {
    const dispatch = useAppDispatch()
    const registration = (username:string,  password:string) => {
        dispatch(signUpAsync(username,  password))
    }
    return (
        <>
            <Form login={false} onSubmitButton={registration}/>
        </>
    )
}