import React from 'react';
import s from "./Header.module.scss"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "../store/store";
import {logoutTC} from "../../feauters/auth/auth-reducer";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/routes";
import {LinearProgress} from "@mui/material";

const Header = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(s => s.auth.isLoggedIn)
    const status = useAppSelector(s => s.app.status)

    function onLogoutClickHandler() {
        dispatch(logoutTC())
    }

    function onLoginClickHandler() {
        navigate(routes.login)
    }

    const onClickHandler = () => {
        navigate(routes.mainPage)
    }

    return (
        <Box sx={{flexGrow: 1}} className={s.headerContainer}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} onClick={onClickHandler}>
                        Task #6
                    </Typography>
                    {isLoggedIn
                        ? <Button color="inherit" onClick={onLogoutClickHandler}>Logout</Button>
                        : <Button color="inherit" onClick={onLoginClickHandler}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            {
                status === "loading" && <LinearProgress color="secondary"/>
            }
        </Box>
    );
};

export default Header;