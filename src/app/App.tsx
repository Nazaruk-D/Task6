import React, {useEffect} from 'react';
import s from "./App.module.scss"
import {RouterProvider} from "react-router-dom";
import {router} from "../routes/routes";
import {useAppDispatch, useAppSelector} from "../store/store";
import {initializeAppTC} from "../store/reducers/app-reducer";
import {CircularProgress} from "@mui/material";
import {selectorIsInitialized} from "../store/selector/selectorApp";
const {SnackbarProvider} = require('notistack');


function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(selectorIsInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '45%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={s.appContainer}>
            <SnackbarProvider maxSnack={3}>
                <RouterProvider router={router}/>
            </SnackbarProvider>
        </div>
    );
}

export default App;
