import React from 'react';
import {useAppSelector} from "../../../app/store/store";
import {routes} from "../../../app/routes/routes";
import {useNavigate} from "react-router-dom";
import Header from "../../../app/header/Header";
import ErrorWindow from "../../../common/ErrorWindow/ErrorWindow";
import LoginForm from "./LoginForm/LoginForm";


const Login = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(s => s.auth.isLoggedIn)

    if (isLoggedIn) navigate(routes.mainPage)

    return (
        <>
            <Header/>
            <LoginForm/>
            <ErrorWindow/>
        </>
    );
};

export default Login;