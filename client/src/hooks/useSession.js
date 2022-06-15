/*
 * ------------------------ useSession --------------------------------
 * 
 * Package:         client
 * Module:          hooks
 * File:            useSession.js
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

import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

// useSession hook
const useSession = () => {
    const [session, setSession] = useContext(SessionContext); // Session context

    // Set user and plan data as dirty, so an update is needed
    const login = () => {
        setSession.setDirty(({ user: true, plan: true }));
    }

    // Set user and plan data as dirty, so an update is needed
    const logout = () => {
        setSession.setDirty(({ user: true, plan: true }));
    }

    // Set user and plan data as dirty, so an update is needed
    const updateInfo = () => {
        setSession.setDirty(({ user: true, plan: true }));
    }

    // Set plan data as dirty, so an update is needed
    const updatePlanInfo = () => {
        setSession.setDirty((old) => ({ ...old, plan: true }));
    }

    // Create a local empty plan for a user into the client session
    const createLocalPlan = (plan) => {
        setSession.setData((old) => ({ ...old, plan: plan }))
    }

    // Delete the local plan from the client session
    const deleteLocalPlan = () => {
        setSession.setData((old) => ({ ...old, plan: null }))
    }

    return { ...session, login, logout, updateInfo, updatePlanInfo, createLocalPlan, deleteLocalPlan };
}

export default useSession;