'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconUsers, IconPencilMinus } from "@tabler/icons-react";
import useSessionContext from "@/hook/useSession";


export const DashboardSideBar = () => {

    const pathName = usePathname()
    const { role } = useSessionContext()


    return (
        <nav className="p-5 text-gray-700 h-full ">
            <ul className="space-y-2">
                <li>
                    <Link
                        href={'/dashboard'}
                        className={`${pathName === '/dashboard' ? 'bg-indigo-100 text-indigo-700 underline' : ' hover:bg-gray-100'} flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700 w-full`}
                    >
                        <IconPencilMinus size={24} className="mx-2" />
                        Posts
                    </Link>
                </li>
                <li hidden={role === 'user'}>
                    <Link
                        href={'/dashboard/users'}
                        className={`${pathName === '/dashboard/users' ? 'bg-indigo-100 text-indigo-700 underline' : ' hover:bg-gray-100'} flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700 w-full`}
                    >
                        <IconUsers size={24} className="mx-2" />
                        Usuarios
                    </Link>
                </li>

            </ul>
        </nav>
    )
}
