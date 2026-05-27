import { Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import ForgotPassword from "../pages/Authentication/ForgotPassword";

function AuthenticationRoutes (){
    return [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <Navigate to='/login' />
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword />
        }
    ];
}

export default AuthenticationRoutes;