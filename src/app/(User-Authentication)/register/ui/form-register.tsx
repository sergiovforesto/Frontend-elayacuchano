'use client'
import { User, ErrorsForms } from "@/interfaces"
import Link from "next/link"
import React, { useState } from "react"
import clsx from "clsx"
import { register_user } from "@/actions"
import { useAuthSession } from "@/store/auth_session"
import { useRouter } from "next/navigation"


export const RegisterForm = () => {

    const [data, setData] = useState<User>({
        name: '',
        lastName: '',
        email: '',
        password: '',
    })
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


        if (Object.values(data).includes('')) {
            setErrors({ message: 'Campos Obligatorios', err: true, fields: '' })
            return
        }

        const isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/

        if (!isStrongPassword.test(data.password)) {
            setErrors({ message: 'Debe contener: Una letra Mayúscula, un carácter especial y mínimo 8 carácteres', err: true, fields: 'password' })
            return
        }

        const user = await register_user(data)
        console.log(user)
        if (user.msg) {
            setErrors({ message: user.msg, err: true, fields: 'Usuario existe' })
            return
        }
        setSuccess('Usuario creado. Confirme su email para ingresar')


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
                        Crea una cuenta
                    </h1>

                    <div>
                        <label
                            htmlFor="nombre"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value.toLowerCase() })}
                            className={
                                clsx(
                                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5",
                                    {
                                        'border-rose-300': errors.err
                                    }
                                )
                            }
                            placeholder="nombre"
                        />
                        {fields === '' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}
                    </div>

                    <div>
                        <label
                            htmlFor="apellido"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            onChange={(e) => setData({ ...data, lastName: e.target.value.toLowerCase() })}
                            className={
                                clsx(
                                    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5',
                                    {
                                        'border-rose-300': errors.err
                                    }
                                )
                            }
                            placeholder="apellido"
                        />
                        {fields === '' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
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
                        {fields === '' || fields === 'Usuario existe' ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}
                    </div>
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
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
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
                        Crear una cuenta
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
