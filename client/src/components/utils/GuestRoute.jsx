/*
 * ------------------------ GuestRoute --------------------------------
 * 
 * Package:         client
 * Module:          components/utils
 * File:            GuestRoute.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useSession } from "../../hooks";

// GuestRoute component
// -- Exported
const GuestRoute = () => {
    const session = useSession(); // Session handler
    const navigate = useNavigate(); // Navigation handler

    // Check if the user is currently logged in
    useEffect(() => {
        if (session.loggedIn)
            // If the user is logged in, redirects to /dashboard route
            navigate('/dashboard', { replace: true });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Else, return current route
    return <Outlet />
}

export default GuestRoute;