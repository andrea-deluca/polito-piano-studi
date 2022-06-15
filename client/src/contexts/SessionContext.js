/*
 * ------------------------ SessionContext ----------------------------
 * 
 * Package:         client
 * Module:          contexts
 * File:            SessionContext.js
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

import { createContext, useState, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';

import { api } from '../services';

// SessionContext includes two objects, 
// one for data and the other one for actions
// -- Exported
const SessionContext = createContext([{}, {}]);

// SessionProvider
// -- Exported
const SessionProvider = ({ children }) => {
    const [data, setData] = useState({ user: null, plan: null }); // Stores user and plan data
    const [loggedIn, setLoggedIn] = useState(null); // Set while the user is logged in
    const [loading, setLoading] = useState(true); // Set while waiting for API call promise
    const [dirty, setDirty] = useState({ user: true, plan: true }); // Set when an info update is needed

    // Load user data into client session
    useEffect(() => {
        setLoading(true);
        // If an update is needed
        if (dirty.user)
            api.sessions.getUserInfo()
                .then(user => {
                    // The user is logged in, so store user data into client session
                    // and set loggedIn state
                    setData((old) => ({ ...old, user: { ...user } }));
                    setLoggedIn(true);
                })
                .catch((err) => {
                    // An error occurs, so set user data to null and unset
                    // the loggedIn state
                    setData((old) => ({ ...old, user: null }));
                    setLoggedIn(false);
                })
                .finally(() => {
                    // User data is updated
                    setDirty((old) => ({ ...old, user: false }))
                })
    }, [dirty.user])

    // Load plan data into client session
    useEffect(() => {
        setLoading(true);
        // If an update is needed
        if (dirty.plan)
            api.plans.getStudyPlan()
                .then((studyPlan) => {
                    // A study plan associated with the logged in user is stored into the db,
                    // so store plan data into client session
                    setData((old) => ({ ...old, plan: { ...studyPlan } }))
                })
                .catch((err) => {
                    // An error occurs, so set plan data to null
                    setData((old) => ({ ...old, plan: null }))
                })
                .finally(() => {
                    // Plan data is updated
                    setLoading(false);
                    setDirty((old) => ({ ...old, plan: false }));
                })
        // Plan data does not need updates
        else setLoading(false);
    }, [dirty.plan])

    const session = { ...data, loggedIn }; // Data object
    const setSession = { setData, setDirty }; // Actions object

    if (!loading) {
        return (
            <SessionContext.Provider value={[session, setSession]}>
                {children}
            </SessionContext.Provider>
        );
    }

    // Wating for API calls promise, so loading
    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation='border' variant='primary' className='opacity-25' />
        </div>
    );

}

export { SessionContext, SessionProvider };