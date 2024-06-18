'use client'
import { useState, useEffect } from "react"
import { RowPostTable } from '../row-post-table/row-post-table';
import { Posts } from "@/interfaces";
import { get_all_posts_by_user } from "@/actions";
import { useAuthSession } from "@/store/auth_session";
import useSessionContext from "@/hook/useSession";
import { obtenerMes } from "@/utils";
import { Pagination } from "@/components/pagination/pagination";

interface Props {
    searchParams: { [key: string]: string | string[] | undefined }
}

export const PostTable = ({ searchParams }: Props) => {

    const currentPage = Number(searchParams?.page) || 1;
    const [totalPost, setTotalPosts] = useState<number>(0)

    const [data, setData] = useState<Posts[]>([])
    const session = useAuthSession(state => state.session_user)
    const { id } = useSessionContext()
    const pageLimit = 6;

    useEffect(() => {

        const getPosts = async () => {
            if (!session) return
            if (!id) return

            try {
                const { ok, posts, totalPosts } = await get_all_posts_by_user(id, session, currentPage, pageLimit)

                if (!ok) return

                setData(posts)
                setTotalPosts(Math.ceil(totalPosts / pageLimit))

            } catch (error) {
                return null
            }

        }

        getPosts()
    }, [currentPage, session, id])

    return (

        <div className="relative overflow-x-auto sm:rounded-lg border">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Titulo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha Publicación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>


                    {
                        data.length > 0 ? (
                            data.map((post) => (

                                <RowPostTable
                                    key={post.id}
                                    postId={post.id}
                                    title={post.title}
                                    description={post.description.split(' ')[0]}
                                    createdAt={obtenerMes(post.createdAt)}
                                />
                            ))
                        ) : (
                            <tr className="bg-white border-b">

                                <th className="px-6 py-4 font-medium whitespace-nowrap text-gray-900">
                                    No hay ningun post publicado
                                </th>


                            </tr>
                        )
                    }

                </tbody>
            </table>

            <Pagination totalPages={totalPost} />
        </div>

    )
}