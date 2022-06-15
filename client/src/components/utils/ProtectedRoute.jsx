/*
 * ------------------------ ProtectedRoute ----------------------------
 * 
 * Package:         client
 * Module:          components/utils
 * File:            ProtectedRoute.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-15
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { useSession } from "../../hooks";

import { VerificationCodeForm } from "../forms";
import { StaticModal } from "../ui-core";

// ProtectedRoute component
// -- Exported
const ProtectedRoute = () => {
    const [show, setShow] = useState(false); // Set while StaticModal is open
    const session = useSession(); // Session handler
    const navigate = useNavigate(); // Navigation handler

    // Checks if the user is logged in and if the user is
    // associated with an activated account
    useEffect(() => {
        if (!session.loggedIn)
            // If the user is not logged in, redirects to /login
            navigate('/login', { replace: true });
        // If the user account is not activated shows StaticModal
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