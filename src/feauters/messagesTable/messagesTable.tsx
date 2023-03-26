import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useNavigate} from "react-router-dom";
import ErrorWindow from "../../common/component/ErrorWindow/ErrorWindow";
import CustomTable from "./CustomTable/CustomTable";
import {routes} from "../../routes/routes";
import {selectorFetchNewMessage, selectorIsLoggedIn, selectorNameUser} from "../../store/selector/selectorApp";
import {fetchMessages, newMessage} from "../../store/reducers/messages-reducer";
import {fetchUsers} from "../../store/reducers/users-reducer";
import {useSnackbar} from "notistack";
import {Button} from "@mui/material";
import {MessageType} from "../../common/types/MessageType";
import Header from "../../common/component/Header/Header";


const MessagesTable = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isInitialFetch, setIsInitialFetch] = useState(false);
    const [ws, setWS] = useState<WebSocket | null>(null)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const isLoggedIn = useAppSelector(selectorIsLoggedIn)
    const userName = useAppSelector(selectorNameUser)
    const lastMessage = useAppSelector(selectorFetchNewMessage)

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

    // const socket = new WebSocket('wss://websocket2-itvq.onrender.com');
    // useEffect(()=>{
    //     if(userName) {
    //         socket.onopen = () => {
    //             socket.send(JSON.stringify( {action: "setUserName", userName}));
    //             socket.send(JSON.stringify({action: "fetchMessages", userName}));
    //             socket.send(JSON.stringify({action: "fetchUsers"}));
    //         };
    //     }
    //     },[userName])
    //
    // useEffect(() => {
    //     socket.onmessage = (messageEvent: any) => {
    //         const messages = JSON.parse(messageEvent.data);
    //         if (messages.action === "fetchMessages") {
    //             dispatch(fetchMessages(messages));
    //         } else if (messages.action === "sendMessage") {
    //             dispatch(newMessage(messages));
    //             setIsInitialFetch(true)
    //         } else if (messages.action === "fetchUsers") {
    //             dispatch(fetchUsers(messages))
    //         }
    //     };
    //     setWS(socket);
    //     return () => {
    //         if (ws) {
    //             ws.close();
    //         }
    //     };
    // }, [dispatch]);
    // const socket = new WebSocket('wss://websocket2-itvq.onrender.com');
    // setWS(socket)
    //
    //
    // function handleMessage(messageEvent: any) {
    //     const messages = JSON.parse(messageEvent.data);
    //     switch (messages.action) {
    //         case 'fetchMessages':
    //             dispatch(fetchMessages(messages));
    //             break;
    //         case 'sendMessage':
    //             dispatch(newMessage(messages));
    //             setIsInitialFetch(true);
    //             break;
    //         case 'fetchUsers':
    //             dispatch(fetchUsers(messages));
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // useEffect(() => {
    //     if (ws) {
    //         ws.send(JSON.stringify({ action: 'setUserName', userName }));
    //         ws.send(JSON.stringify({ action: 'fetchMessages', userName }));
    //         ws.send(JSON.stringify({ action: 'fetchUsers' }));
    //
    //
    //         ws!.addEventListener('message', handleMessage);
    //         return () => {
    //             ws!.removeEventListener('message', handleMessage);
    //         };
    //     }
    // }, [userName]);


    function handleMessage(messageEvent: any) {
        const messages = JSON.parse(messageEvent.data);
        switch (messages.action) {
            case 'fetchMessages':
                dispatch(fetchMessages(messages));
                break;
            case 'sendMessage':
                dispatch(newMessage(messages));
                setIsInitialFetch(true);
                break;
            case 'fetchUsers':
                dispatch(fetchUsers(messages));
                break;
            default:
                break;
        }
    }

    if(ws) {
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
    }

    useEffect(() => {
        if (ws) {
            ws.addEventListener('open', async () => {
                ws.send(JSON.stringify({ action: 'setUserName', userName }));
                ws.send(JSON.stringify({ action: 'fetchMessages', userName }));
                ws.send(JSON.stringify({ action: 'fetchUsers' }));
            });

            ws.addEventListener('message', handleMessage);

            return () => {
                ws.removeEventListener('message', handleMessage);
            };
        } else {
            const socket = new WebSocket('wss://websocket2-itvq.onrender.com');
            setWS(socket);
        }
    }, [userName, ws]);

    useEffect(() => {
        if (lastMessage && isInitialFetch) {
            handleClickWithAction(lastMessage)
        }
    }, [lastMessage, isInitialFetch])

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
