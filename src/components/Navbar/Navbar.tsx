import React from "react";
import s from "./navbar.module.css"
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {removeUserAsync} from "../../store/authSlice";


export const Navbar = () => {
    const {
        user,
        isAuth
    } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const goToLogin = () => {
        navigate("login")
    }
    const logout = () => {
        dispatch(removeUserAsync())
        navigate("login")
    }
    const goToRegistration = () => {
        navigate("registration")
    }
    const goToMyContent = () => {
        navigate("content")
    }
    return (
        <div className={s.navbarContainer}>
            <div className={s.myLinks} onClick={goToMyContent}>Мои ссылки</div>
            <div className={s.loginButton}>
                {isAuth ?
                    <div className={s.authButton} onClick={logout}>Выйти</div>
                    :
                    <>
                        <div className={s.authButton} onClick={goToLogin}>Войти</div>
                        <div className={s.authButton} onClick={goToRegistration}>Зарегистрироваться</div>
                    </>
                }
            </div>
        </div>
    )
}