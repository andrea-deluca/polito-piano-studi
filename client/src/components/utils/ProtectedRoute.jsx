/*
 * ------------------------ ProtectedRoute ----------------------------
 * 
 * Package:         client
 * Module:          components/utils
 * File:            ProtectedRoute.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21    
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { useSession } from "../../hooks";

// ProtectedRoute component
// -- Exported
const ProtectedRoute = () => {
    const session = useSession(); // Session handler
    const navigate = useNavigate(); // Navigation handler

    // Checks if the user is logged in and if the user is
    // associated with an activated account
    useEffect(() => {
        if (!session.loggedIn)
            // If the user is not logged in, redirects to /login
            navigate('/login', { replace: true });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (session.loggedIn)
        return (
            <Outlet />
        );
}

export default ProtectedRoute;