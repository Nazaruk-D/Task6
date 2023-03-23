import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {useNavigate} from "react-router-dom";
import Header from "../../app/header/Header";
import ErrorWindow from "../../common/ErrorWindow/ErrorWindow";
import CustomTable from "./CustomTable/CustomTable";
import {routes} from "../../app/routes/routes";


const MessagesTable = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(s => s.auth.isLoggedIn)

    useEffect(() => {
        // dispatch(fetchUsersTC())
    }, [dispatch])

    useEffect(() => {
        if (!isLoggedIn) navigate(routes.login)
    }, [isLoggedIn, navigate])

    return (
        <div>
            <Header/>
            <CustomTable/>
            <ErrorWindow/>
        </div>
    );
};

export default MessagesTable;

