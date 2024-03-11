import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from "../store/features/selectors";

export const useAuth = () => {
    const user = useSelector(selectUser);

    return useMemo(() => ({ user }), [user])
}
