import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const useSession = () => {
    const [session, setSession] = useContext(SessionContext);

    const login = () => {
        setSession.setDirty(({ user: true, plan: true }));
    }

    const logout = () => {
        setSession.setDirty(({ user: true, plan: true }));
    }

    const updateInfo = () => {
        setSession.setDirty(({ user: true, plan: true }));
    }

    const updatePlanInfo = () => {
        setSession.setDirty((old) => ({ ...old, plan: true }));
    }

    const createLocalPlan = (plan) => {
        setSession.setData((old) => ({ ...old, plan: plan }))
    }

    const deleteLocalPlan = () => {
        setSession.setData((old) => ({ ...old, plan: null }))
    }

    return { ...session, login, logout, updateInfo, updatePlanInfo, createLocalPlan, deleteLocalPlan };
}

export default useSession;