'use client'

import { useEffect, useState } from "react"
import { create_comment, get_profile } from "@/actions"
import { ErrorsForms } from "@/interfaces"
import { useAuthSession } from "@/store/auth_session"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useSessionContext from "@/hook/useSession"

interface Props {
    postId: string;
}

export const FormComment = ({ postId }: Props) => {

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })
    const [profile, setProfile] = useState({
        image: ''
    })



    const router = useRouter()
    const { id } = useSessionContext()
    const session = useAuthSession(state => state.session_user)



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

    const onSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (content === '') {
            setErrors({ message: 'Debes escribir un comentario', err: true, fields: '' })
            return
        }

        if (!session) {
            alert('Inicia sesión/Registrate para comentar')
            return
        }


        const comment = await create_comment(session, postId, content)

        if (!comment.ok) {
            setErrors({ message: comment.msg, err: true, fields: '' })
            return
        }
        setContent('')
        router.refresh()

    }


    const { message, fields } = errors

    return (
        <div className="flex space-x-3 w-full mt-6">
            <div>
                <Image
                    src={profile.image ? profile.image : '/img-user-default.jpg'}
                    width={30}
                    height={30}
                    alt="image"
                    className="w-9 h-8 rounded-full"
                    unoptimized
                />
            </div>


            <div className="w-full">

                <form onSubmit={onSubmitComment} className={
                    clsx(
                        "border border-gray-300 focus-within:outline outline-1 outline-indigo-600 rounded-lg w-full",
                        {
                            'outline-rose-600 border-rose-600': errors.err
                        }
                    )
                }>
                    <textarea
                        rows={2}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="resize-none rounded-lg w-full outline-none p-3"
                    />


                    <div className="flex justify-end px-3 py-2 border-t rounded-b-lg">
                        <button
                            type="submit"
                            className="text-white border bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            Comentar
                        </button>
                    </div>
                </form>
                {fields === '' ? <p className="text-xs text-rose-600 font-light mt-1">{message}</p> : ''}

            </div>
        </div>
    )
}
