import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { useSession } from "../../hooks";

import { VerificationCodeForm } from "../forms";
import { StaticModal } from "../ui-core";

const ProtectedRoute = () => {
    const session = useSession();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!session.loggedIn)
            navigate('/login', { replace: true });
        if (!session.active) setShow(true);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (session.user && !session.user.activeStatus) {
        return (
            <>
                <StaticModal show={show} title={"Completa la verifica del tuo account"}>
                    <VerificationCodeForm variant="modal" email={session.user.email} next={() => setShow(false)} />
                </StaticModal>
                <Outlet />
            </>
        );
    }
    else if (session.loggedIn)
        return (
            <Outlet />
        );
}

export default ProtectedRoute;