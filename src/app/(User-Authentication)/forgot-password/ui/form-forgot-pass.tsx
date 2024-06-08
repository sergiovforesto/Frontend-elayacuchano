'use client'
import Link from "next/link"
import clsx from "clsx"
import { useState } from "react"
import { ErrorsForms } from "@/interfaces"
import { reset_password } from "@/actions/reset-password/reset_password"
import { useRouter } from "next/navigation"
import { useAuthSession } from "@/store/auth_session"



export const ForgotPasswordForm = () => {
    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')

    const router = useRouter()
    const session = useAuthSession(state => state.session_user)

    if (session) {
        router.replace('/')
        return
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            setErrors({ message: 'Campo requerido', err: true, fields: 'email' })
            return
        }

        const change_password = await reset_password(email)


        if (change_password.msg) {
            setErrors({ message: change_password.msg, err: true, fields: 'Error al enviar email' })
            return
        }
        setSuccess('Email enviado. Por favor revise su bandeja de entrada y siga los pasos')

    }

    const { message, fields } = errors

    return (
        <>

            {success.length > 1 ? (
                <>
                    <p className="mb-4">{success}</p>
                    <Link
                        href='/login'
                        className="w-full block text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                        Ingresar
                    </Link>
                </>
            ) : (
                <>

                    <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Olvidaste tu contraseña?
                    </h1>
                    <p className="font-light text-gray-500 dark:text-gray-400">
                        Enviaremos un email con los pasos para recuperar tu  contraseña
                    </p>
                    <form onSubmit={onSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
                            {fields === 'email' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}
                            {fields === 'Error al enviar email' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}

                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            Recuperar contraseña
                        </button>
                        <div className="flex items-start">

                            <div className="text-sm">

                                <Link className="font-light flex items-center text-gray-500 hover:underline " href={'/login'}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                                    </svg>

                                    Regresar
                                </Link>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    )
}
