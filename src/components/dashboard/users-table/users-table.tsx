'use client'
import { get_all_users } from "@/actions";
import { Pagination } from "@/components"
import useSessionContext from "@/hook/useSession";
import { User } from "@/interfaces";
import { useAuthSession } from "@/store/auth_session";
import { obtenerMes } from "@/utils";
import { useState, useEffect, use } from "react";
import { RowUserTable } from "../row-user-table/row-user-table";
import { useRouter } from "next/navigation";

interface Props {
    searchParams: { [key: string]: string | string[] | undefined }
}

export const UsersTable = ({ searchParams }: Props) => {


    const currentPage = Number(searchParams?.page) || 1;
    const [totalUsers, setTotalUsers] = useState<number>(0)

    const [data, setData] = useState<User[]>([])
    const session = useAuthSession(state => state.session_user)
    const { role } = useSessionContext()
    const pageLimit = 6;
    const router = useRouter()


    useEffect(() => {

        const getUsers = async () => {
            if (!session) return
            if (role !== 'admin') {
                router.replace('/dashboard')
            }

            try {
                const { ok, users, totalUsers } = await get_all_users(session, currentPage, pageLimit)

                if (!ok) return
                setData(users)
                setTotalUsers(Math.ceil(totalUsers / pageLimit))

            } catch (error) {
                return null
            }

        }

        getUsers()
    }, [currentPage, session])

    return (

        <div className="relative overflow-x-auto sm:rounded-lg border">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estatus
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha Creación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user) => (

                            <RowUserTable
                                key={user.id}
                                userId={user.id ?? ''}
                                name={user.name}
                                lastName={user.lastName}
                                role={user.role ?? ''}
                                inSession={user.inSession ?? false}
                                createdAt={user.createdAt ? obtenerMes(user.createdAt) : ''}
                            />
                        ))
                    }

                </tbody>
            </table>

            <Pagination totalPages={totalUsers} />
        </div>

    )
}