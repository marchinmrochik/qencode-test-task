import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../store/features/selectors";

export function PrivateOutlet() {
    const IsLoggedIn = useSelector(selectIsLoggedIn);

    return IsLoggedIn ? (
        <Outlet/>
    ) : (
        <Navigate to="/login"/>
    )
}
