import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useSession } from "../../hooks";

const GuestRoute = () => {
    const session = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (session.loggedIn)
            navigate('/dashboard', { replace: true });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <Outlet />
}

export default GuestRoute;