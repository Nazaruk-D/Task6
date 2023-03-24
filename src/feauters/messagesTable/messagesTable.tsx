import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {useNavigate} from "react-router-dom";
import Header from "../../app/header/Header";
import ErrorWindow from "../../common/ErrorWindow/ErrorWindow";
import CustomTable from "./CustomTable/CustomTable";
import {routes} from "../../app/routes/routes";
import {selectorFetchNewMessage, selectorNameUser} from "../../app/store/selector/selectorApp";
import {fetchMessages, newMessage} from "./messages-reducer";
import {fetchUsers} from "../../app/store/users-reducer";
import {useSnackbar} from "notistack";
import {Button} from "@mui/material";
import {MessageType} from "../../api/messageAPI";


const MessagesTable = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(s => s.auth.isLoggedIn)
    const userName = useAppSelector(selectorNameUser)
    const lastMessage = useAppSelector(selectorFetchNewMessage)
    const [ws, setWS] = useState<WebSocket | null>(null)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [isInitialFetch, setIsInitialFetch] = useState(false);


    useEffect(() => {
        if (ws) {
            ws.onmessage = (messageEvent: any) => {
                const messages = JSON.parse(messageEvent.data);
                if (messages.action === "fetchMessages") {
                    dispatch(fetchMessages(messages));
                } else if (messages.action === "sendMessage") {
                    dispatch(newMessage(messages));
                    setIsInitialFetch(true)
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

    const handleClickWithAction = useCallback((lastMessage: MessageType) => {
        enqueueSnackbar(<div>
            <div>New message from <strong>{lastMessage.sender_name}</strong></div>
            <div>Subject: <strong>{lastMessage.subject}</strong></div>
            <div>{lastMessage.message}</div>
        </div>, {
            variant: 'default',
            action: (key) => (
                <Fragment>
                    <Button size='small' onClick={() => closeSnackbar(key)}>X</Button>
                </Fragment>
            )
        });
    }, [enqueueSnackbar, closeSnackbar]);


    useEffect(() => {
        if (lastMessage && isInitialFetch) {
            console.log(lastMessage)
            handleClickWithAction(lastMessage)
        }
    }, [lastMessage, lastMessage, isInitialFetch])

    return (
        <div>
            <Header/>
            <CustomTable ws={ws}/>
            <ErrorWindow/>
        </div>
    );
};

export default MessagesTable;

