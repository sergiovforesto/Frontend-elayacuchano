'use client'
import { createContext, useState, useEffect } from "react"
import { useAuthSession } from "@/store/auth_session"
import { get_session_user } from "@/actions"

interface InSession {
    id?: string;
    name?: string;
    email?: string;
    lastName?: string;
    role?: string;

}

interface AuthenticationContextType extends InSession {
    closeSessionAuthContext: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextType>({
    id: '',
    name: '',
    email: '',
    lastName: '',
    role: '',
    closeSessionAuthContext: () => { },
});

// const AuthenticationContext = createContext<InSession>({ id: '' })

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {

    const session = useAuthSession(state => state.session_user || '')
    const [auth, setAuth] = useState({
        id: '',
        name: '',
        email: '',
        lastName: '',
        role: ''
    }) ?? {}

    useEffect(() => {
        const authUser = async () => {
            if (!session || session.length === 0) {
                return null
            }

            try {
                const auth_user = await get_session_user(session)
                setAuth({
                    ...auth,
                    id: auth_user.id,
                    name: auth_user.name,
                    lastName: auth_user.lastName,
                    email: auth_user.email,
                    role: auth_user.role
                })


            } catch (error) {
                return null
            }
        }

        authUser()
    }, [session])

    const closeSessionAuthContext = () => {
        setAuth({
            id: '',
            name: '',
            email: '',
            lastName: '',
            role: ''
        })
    }

    return (
        <AuthenticationContext.Provider
            value={{
                id: auth.id,
                name: auth.name,
                lastName: auth.lastName,
                email: auth.email,
                role: auth.role,
                closeSessionAuthContext


            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}


export {
    AuthenticationProvider
}

export default AuthenticationContext

//!Nota cuando lo llames con next, debe se 'use client' sino te dara error
