import React, {FC, useState} from "react";
import s from "./auth.module.css";

type FormPropsType = {
    login: boolean
    onSubmitButton: (username:string,  password:string) => void
}

export const Form: FC<FormPropsType>= (props) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
     setPassword(e.target.value)
    }
    const onSubmitButton = () => {
        props.onSubmitButton(userName,password)
    }
    const submitButtonText = props.login ? "Войти" : "Зарегистрироваться"
    return (
        <div className={s.loginContainer}>
            <div className={s.nameInput}>Имя пользователя</div>
            <input
                className={s.inputStyle}
                value={userName}
                onChange={onChangeUserName}
            />
            <div className={s.nameInput}>Пароль</div>
            <input
                className={s.inputStyle}
                type={"password"}
                value={password}
                onChange={onChangePassword}
            />
            <div className={s.loginButton} onClick={onSubmitButton}>{submitButtonText}</div>
        </div>
    )
}