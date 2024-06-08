'use client'
import Link from "next/link"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ErrorsForms } from "@/interfaces"
import { sign_in } from "@/actions"
import { useAuthSession } from "@/store/auth_session"

interface LoginUser {
    email: string;
    password: string
}

export const LoginForm = () => {


    const [data, setData] = useState<LoginUser>({ email: '', password: '' })
    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })
    const [success, setSuccess] = useState('')

    const router = useRouter()
    const session = useAuthSession(state => state.session_user)
    const setSession = useAuthSession(state => state.setSessionUser)

    if (session) {
        router.replace('/')
        return
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(data).includes('')) {
            setErrors({ message: 'Campos requeridos', err: true, fields: '' })
            return
        }

        const logIn_user = await sign_in(data)

        if (!logIn_user.ok) {
            setErrors({ message: logIn_user.msg, err: true, fields: '' })
            return
        }

        setSuccess('Exitoso')
        const { token } = logIn_user.user

        setSession(token)

        router.replace('/')



    }

    const { message, fields } = errors

    return (
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value.toLowerCase() })}
                    className={
                        clsx(
                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5',
                            {
                                'border-rose-300': errors.err
                            }
                        )
                    }
                    placeholder="email@account.com"
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contraseña
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}

                    placeholder="••••••••"
                    className={
                        clsx(
                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5',
                            {
                                'border-rose-300': errors.err
                            }
                        )
                    }
                />
                {fields === '' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}
            </div>
            <div className="flex items-center justify-between">

                <Link href={'/forgot-password'} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Olvidaste tu contraseña?
                </Link>
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Ingresar
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                No tienes una cuenta? <Link href="/register" className="font-medium text-primary-600 hover:underline ">Registrate</Link>
            </p>
        </form>
    )
}
