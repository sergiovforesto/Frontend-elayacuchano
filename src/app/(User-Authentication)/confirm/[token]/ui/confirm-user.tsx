'use client'

import { confirm_user } from "@/actions/register/confirm_user";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"

interface Props {
    token: string;
}

export const ConfirmUserToken = ({ token }: Props) => {
    const [isOk, setIsOk] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const getToken = async () => {
            const isConfirm = await confirm_user(token)

            if (!isConfirm.ok) {
                router.replace('/login')
            }

            setIsOk(isConfirm.ok)

        }

        getToken()

    }, [token, router])


    return (
        <>
            {
                isOk ? (
                    <>
                        <h2 className="text-center text-gray-900">Usuario confirmado exitosamente</h2>
                        <Link
                            href='/login'
                            className="w-full block text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Ir a ingresar
                        </Link>
                    </>
                ) : null
            }
        </>
    )
}





