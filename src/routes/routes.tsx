import {createBrowserRouter} from "react-router-dom";
import Login from "../feauters/auth/login/Login";
import MessagesTable from "../feauters/messagesTable/messagesTable";
import Error404 from "../common/component/Error404/Error404";

export const routes = {
    mainPage: '/Task6/',
    login: '/Task6/login',
}

export const router = createBrowserRouter([
    {
        path: routes.mainPage,
        element: <MessagesTable/>,
        errorElement: <Error404/>
    },
    {
        path: routes.login,
        element: <Login/>
    },
])