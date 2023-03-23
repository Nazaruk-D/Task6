import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {useNavigate} from "react-router-dom";
import Header from "../../app/header/Header";
import ErrorWindow from "../../common/ErrorWindow/ErrorWindow";
import CustomTable from "./CustomTable/CustomTable";
import {routes} from "../../app/routes/routes";
import {fetchMessagesTC} from "./messages-reducer";
import {selectorNameUser} from "../../app/store/selector/selectorApp";


const MessagesTable = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(s => s.auth.isLoggedIn)
    const userName = useAppSelector(selectorNameUser)

    useEffect(() => {
        dispatch(fetchMessagesTC(userName))
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

