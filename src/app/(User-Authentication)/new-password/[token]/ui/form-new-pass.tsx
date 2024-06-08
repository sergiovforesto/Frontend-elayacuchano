'use client'
import { ErrorsForms } from "@/interfaces"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import clsx from "clsx"
import { new_password } from "@/actions"
import { useAuthSession } from "@/store/auth_session"


interface Props {
    token: string;
}

export const NewPasswordForm = ({ token }: Props) => {

    const [newPassword, setNewPassword] = useState('')
    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })
    const [success, setSuccess] = useState('')

    const router = useRouter()
    const session = useAuthSession(state => state.session_user)

    if (session) {
        router.replace('/')
        return
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (!newPassword) {
            setErrors({ message: 'Campos Obligatorios', err: true, fields: '' })
            return
        }

        const isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/

        if (!isStrongPassword.test(newPassword)) {
            setErrors({ message: 'Debe contener: Una letra Mayúscula, un carácter especial y mínimo 8 carácteres', err: true, fields: 'password' })
            return
        }

        const change_password = await new_password(token, newPassword)
        console.log(change_password)
        if (change_password.msg) {
            setErrors({ message: change_password.msg, err: true, fields: 'nueva contraseña' })
            return
        }
        setSuccess('Su contraseña fue cambiaba exitosamente')

        new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    router.replace('/login')
                )
            }, 3000)
        })


    }

    const { message, fields } = errors
    return (

        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">

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
                    <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Nueva Contraseña
                    </h1>


                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={
                                clsx(
                                    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5',
                                    {
                                        'border-rose-300': errors.err
                                    }
                                )
                            }
                        />
                        {fields === 'password' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}
                        {fields === '' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}
                    </div>


                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                        Actualizar
                    </button>
                    <p
                        className="text-sm font-light text-gray-500 dark:text-gray-400">
                        ya tienes una cuenta?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Ingresa aquí
                        </Link>
                    </p>

                </>
            )}
        </form>
    )
}
