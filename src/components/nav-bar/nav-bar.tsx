'use client'
import { useState, useEffect } from "react"
import { titleAyacuchano } from "@/fonts/fonts"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { IconMenu2 } from "@tabler/icons-react"
import { useAuthSession } from "@/store/auth_session"
import useSessionContext from "@/hook/useSession"
import { get_profile, log_out } from "@/actions"



export const NavBar = () => {


    const [profile, setProfile] = useState({

        image: ''

    })
    const [menuMain, setMenuMain] = useState(false)
    const [menuUser, setMenuUser] = useState(false)


    const session = useAuthSession(state => state.session_user)
    const closeSession = useAuthSession(state => state.closeSession)
    const { id, name, lastName, email, closeSessionAuthContext } = useSessionContext()



    const main_menu = [

        { id: 1, title: "Inicio", href: '/' },
        { id: 2, title: "Nosotros", href: '/about' },
        { id: 3, title: "Contacto", href: '/contact' },

    ]

    const user_menu = [
        { id: 1, title: "Perfil", href: '/profile' },
        { id: 2, title: "Dashboard", href: '/dashboard' },
    ]

    const router = useRouter()

    useEffect(() => {
        const getProfile = async () => {

            if (id) {
                const user_profile = await get_profile(session, id)

                if (user_profile?.Profile) {

                    setProfile({
                        ...profile,
                        image: user_profile?.Profile?.image,
                    })
                }
            }

            return null

        }

        getProfile()
    }, [session, id])

    const sessionOff = async () => {
        if (!session) return
        if (!email) return

        const isTrueConfirm = confirm('¿Estas seguro de cerrar sesión?')

        if (!isTrueConfirm) return

        const logout = await log_out(email, session)
        if (logout.ok) {
            closeSession()
            closeSessionAuthContext()
            router.refresh()
        } else {
            return null
        }
    }


    return (

        <nav className="bg-white border-b">
            <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className={`${titleAyacuchano.className} font-semibold text-xl`}>El Ayacuchano</span>
                </Link>
                <div className="relative flex items-center md:order-2 space-x-3 md:space-x-5">



                    <div className="hidden sm:flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={() => router.push('/create-post')}
                            className={
                                clsx(
                                    " text-blue-600 bg-white hover:bg-blue-700 hover:text-white hover:underline font-medium rounded-lg text-sm px-4 py-2 text-center border border-blue-600",
                                    { 'hidden': session.length === 0 }
                                )
                            }
                        >
                            Crear post
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/login')}
                            className={
                                clsx(
                                    " text-blue-600 bg-white hover:underline font-medium rounded-lg text-sm px-4 py-2 text-center border border-blue-600",
                                    { 'hidden': session.length > 15 }
                                )
                            }
                        >
                            Ingresar
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/register')}
                            className={
                                clsx(
                                    "text-white bg-blue-600 hover:bg-blue-700 hover:text-white hover:underline font-medium rounded-lg text-sm px-4 py-2 text-center",
                                    { 'hidden': session.length > 15 }
                                )
                            }
                        >
                            Registrate
                        </button>
                    </div>


                    <button
                        type="button"
                        onClick={() => setMenuUser(!menuUser)}
                        className={
                            clsx(
                                "rounded-full",
                                { 'focus:ring-4 focus:ring-indigo-100': menuUser }
                            )
                        }
                    >
                        <Image
                            src={profile.image ? profile.image : '/img-user-default.jpg'}
                            width={30}
                            height={30}
                            alt="profile image"
                            className="rounded-full w-9 h-9 aspect-video"
                            unoptimized
                        />
                    </button>

                    <div
                        className={
                            clsx(
                                "absolute z-50 top-11 right-1 my-4 text-base bg-white divide-y divide-gray-100 rounded-lg shadow",
                                {
                                    'hidden': !menuUser
                                }
                            )
                        }
                    >

                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 capitalize">
                                {name && lastName ? name + ' ' + lastName : '¡Bienvenido!😀'}
                            </span>
                            <span className={
                                clsx(
                                    "block text-sm  text-gray-500",
                                    { 'hidden': !email }
                                )
                            }>{email}</span>
                        </div>

                        <ul className="py-2">

                            {
                                session.length > 15 ? (
                                    user_menu.map((item) => (

                                        <li key={item.id}>
                                            <Link href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>

                                    ))

                                ) : null
                            }


                            <li className={
                                clsx(
                                    { 'hidden': session.length === 0 }
                                )
                            }>
                                <Link href={'/create-post'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                >
                                    Create Post
                                </Link>
                            </li>

                            <li className={
                                clsx(
                                    { 'hidden': session.length === 0 }
                                )
                            }>
                                <button
                                    type="button"
                                    onClick={sessionOff}
                                    className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    Cerrar Sesión
                                </button>
                            </li>

                            <li className={
                                clsx(
                                    { 'hidden': session.length > 15 }
                                )
                            }>
                                <Link href={'/login'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                >
                                    Ingresar
                                </Link>
                            </li>

                            <li className={
                                clsx(
                                    { 'hidden': session.length > 15 }
                                )
                            }>
                                <Link href={'/register'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                >
                                    Registrate
                                </Link>
                            </li>

                        </ul>
                    </div>


                    <button
                        type="button"
                        onClick={() => setMenuMain(!menuMain)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100"
                    >

                        <IconMenu2 />

                    </button>

                </div>


                <div

                    className={
                        clsx(
                            "items-center justify-between w-full md:flex md:w-auto md:order-1",
                            {
                                'hidden': !menuMain,
                            }
                        )
                    }
                >

                    <ul
                        className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:hidden md:mt-0 md:border-0 md:bg-white">


                        {
                            main_menu.map((item) => (

                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))
                        }






                    </ul>
                </div>
            </div>
        </nav>
    )
}
