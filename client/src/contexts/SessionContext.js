import { Spinner } from 'react-bootstrap';
import { createContext, useState, useEffect } from 'react';
import { api } from '../services';

const SessionContext = createContext([{}, {}]);

const SessionProvider = ({ children }) => {
    const [data, setData] = useState({ user: null, plan: null });
    const [loggedIn, setLoggedIn] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dirty, setDirty] = useState({ user: true, plan: true });

    useEffect(() => {
        setLoading(true);
        if (dirty.user)
            api.sessions.getUserInfo()
                .then(user => {
                    setData((old) => ({ ...old, user: { ...user } }));
                    setLoggedIn(true);
                })
                .catch(() => {
                    setData((old) => ({ ...old, user: null }));
                    setLoggedIn(false);
                })
                .finally(() => {
                    setDirty((old) => ({ ...old, user: false }))
                })
    }, [dirty.user])

    useEffect(() => {
        setLoading(true);
        if (dirty.plan)
            api.plans.getStudyPlan()
                .then((studyPlan) => {
                    setData((old) => ({ ...old, plan: { ...studyPlan } }))
                })
                .catch((err) => {
                    setData((old) => ({ ...old, plan: null }))
                })
                .finally(() => {
                    setLoading(false);
                    setDirty((old) => ({ ...old, plan: false }));
                })
        else setLoading(false);
    }, [dirty.plan])

    const session = { ...data, loggedIn };
    const setSession = { setData, setLoggedIn, setDirty };

    if (!loading) {
        return (
            <SessionContext.Provider value={[session, setSession]}>
                {children}
            </SessionContext.Provider>
        );
    }

    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation='border' variant='primary' className='opacity-25' />
        </div>
    );

}

export { SessionContext, SessionProvider };