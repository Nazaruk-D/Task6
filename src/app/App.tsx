import React, {useEffect} from 'react';
import s from "./App.module.scss"
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/routes";
import {useAppDispatch, useAppSelector} from "./store/store";
import {initializeAppTC} from "./app-reducer";
import {CircularProgress} from "@mui/material";

function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(s => s.app.initialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '45%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

  return (
      <div className={s.appContainer}>
          <RouterProvider router={router}/>
      </div>
  );
}

export default App;
