import React, {useEffect} from 'react';
import {useAppSelector} from "../../../store/store";
import {routes} from "../../../routes/routes";
import {useNavigate} from "react-router-dom";
import ErrorWindow from "../../../common/component/ErrorWindow/ErrorWindow";
import LoginForm from "./LoginForm/LoginForm";
import Header from "../../../common/component/Header/Header";
import {selectorIsLoggedIn} from "../../../store/selector/selectorApp";


const Login = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(selectorIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn) navigate(routes.mainPage)
    }, [isLoggedIn])

    return (
        <>
            <Header/>
            <LoginForm/>
            <ErrorWindow/>
        </>
    );
};

export default Login;