import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    session_user: string;
    setSessionUser: (token: string) => void;
    closeSession: () => void;
}

export const useAuthSession = create<State>()(
    persist(
        (set, get) => ({
            session_user: '',
            setSessionUser: (token: string) => set(() => ({ session_user: token })),
            closeSession: () => set(() => ({ session_user: '' }))
        }),
        {
            name: 'session_user'
        }
    )
);