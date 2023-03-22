import {createBrowserRouter} from "react-router-dom";
import Login from "../../feauters/auth/login/Login";
import MessagesTable from "../../feauters/messagesTable/messagesTable";

export const routes = {
    mainPage: '/',
    login: '/login',
}

export const router = createBrowserRouter([
    {
        path: routes.mainPage,
        element: <MessagesTable/>,
        errorElement: <div>Error page</div>
    },
    {
        path: routes.login,
        element: <Login/>
    },
])