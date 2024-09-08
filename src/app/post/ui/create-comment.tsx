'use client'

import { useEffect, useState } from "react"
import { create_comment, get_profile } from "@/actions"
import { ErrorsForms } from "@/interfaces"
import { useAuthSession } from "@/store/auth_session"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useSessionContext from "@/hook/useSession"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    postId: string;
}

export const FormComment = ({ postId }: Props) => {

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })
    const [profile, setProfile] = useState({
        image: ''
    })

    const [loading, setLoding] = useState(false)



    const router = useRouter()
    const { id } = useSessionContext()
    const session = useAuthSession(state => state.session_user)
    const notify = (msg: string) => toast.success(msg);



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

        setLoding(true)
        const comment = await create_comment(session, postId, content)

        if (!comment.ok) {
            setErrors({ message: comment.msg, err: true, fields: '' })
            return
        }
        setTimeout(() => {
            notify('Creado exitosamente!')
        }, 2000);
        setContent('')
        setLoding(false)
        router.refresh()

    }


    const { message, fields } = errors

    return (
        <>
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
                                disabled={loading}
                                className={
                                    clsx(
                                        "inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 cursor-pointer",
                                        { 'cursor-not-allowed space-x-2': loading }
                                    )
                                }
                            >
                                <span>Comentar</span>
                                <Image
                                    src={'/mini-spinner.svg'}
                                    width={20} height={20}
                                    alt='spinner'
                                    hidden={!loading}
                                />
                            </button>
                        </div>
                    </form>
                    {fields === '' ? <p className="text-xs text-rose-600 font-light mt-1">{message}</p> : ''}

                </div>
            </div>


            <ToastContainer />
        </>
    )
}
