import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {useNavigate} from "react-router-dom";
import Header from "../../app/header/Header";
import ErrorWindow from "../../common/ErrorWindow/ErrorWindow";
import CustomTable from "./CustomTable/CustomTable";
import {routes} from "../../app/routes/routes";
import {selectorNameUser} from "../../app/store/selector/selectorApp";
import {fetchMessages, newMessage} from "./messages-reducer";
import {fetchUsers} from "../../app/store/users-reducer";


const MessagesTable = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(s => s.auth.isLoggedIn)
    const userName = useAppSelector(selectorNameUser)
    const [ws, setWS] = useState<WebSocket | null>(null)

    useEffect(() => {
        if (ws) {
            ws.onmessage = (messageEvent: any) => {
                const messages = JSON.parse(messageEvent.data);
                if (messages.action === "fetchMessages") {
                    dispatch(fetchMessages(messages));
                } else if (messages.action === "sendMessage") {
                    dispatch(newMessage(messages));
                } else if (messages.action === "fetchUsers") {
                    dispatch(fetchUsers(messages))
                }
            };

            setTimeout(() => {
                const message = {action: "setUserName", userName};
                ws.send(JSON.stringify(message));
                ws.send(JSON.stringify({action: "fetchMessages", userName}));
                ws.send(JSON.stringify({action: "fetchUsers"}));
            }, 100);
        }
    }, [ws]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setWS(socket)
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [])

    useEffect(() => {
        if (!isLoggedIn) navigate(routes.login)
    }, [isLoggedIn, navigate])

    return (
        <div>
            <Header/>
            <CustomTable ws={ws}/>
            <ErrorWindow/>
        </div>
    );
};

export default MessagesTable;

