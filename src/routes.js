import {createBrowserRouter} from "react-router-dom";
import {ForgotPassword, LogIn, SetNewPassword, SignUp, NotFound} from "./view/pages";
import {PrivateOutlet} from "./utils/privateOutlet";

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <LogIn/>,
    },
    {
        path: "/sing-up",
        element: <SignUp/>,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    },
    {
        path: '/set-new-password',
        element: <SetNewPassword/>
    },
    {
        path: '/',
        element: <PrivateOutlet/>,
        children: [
            /// Add nested routes for authenticated users here
            // For example:
            // { path: '/dashboard', element: <Dashboard /> },
        ],
    },
    {
        path: '*',
        element: <NotFound/>
    }
]);

export default routes
