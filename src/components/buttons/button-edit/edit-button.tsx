'use client'
import { useState } from "react"
import { IconAlertCircle, IconDotsVertical, IconX } from "@tabler/icons-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useSessionContext from "@/hook/useSession"
import clsx from "clsx"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuthSession } from "@/store/auth_session"
import { delete_post_id } from "@/actions"


interface Props {
    postId: string;
    authorId: string;
}

export const EditButton = ({ postId, authorId }: Props) => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    const [loading, setLoding] = useState(false)

    const { id } = useSessionContext();
    const isValid = id === authorId;

    const session = useAuthSession(state => state.session_user)
    const notify = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);
    const router = useRouter()


    const handleDeleteClick = () => {
        setOpenModal(true); // Abre el modal cuando se hace clic en "Eliminar"
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Cierra el modal
    };

    const handleConfirmDelete = async () => {

        setLoding(true)
        if (!id && !session) {
            setLoding(false)
        }

        if (!isValid) {
            notifyError('Solo autor del post, puede ejecutar esta acción')
            return
        }

        try {
            const del_post = await delete_post_id(session, postId)
            console.log(del_post)
            if (!del_post.ok) {
                notifyError('Error al borrar el post')
                return
            }

            notify('Post eliminado correctamente')


            setLoding(false)
            setOpenModal(false);
            setOpen(false)

            setTimeout(() => {
                router.replace('/')
            }, 3000);

        } catch (error) {
            notifyError('Error del servidor')
        }


    };

    return (

        <>

            <div className={clsx('flex flex-grow justify-end items-center relative', { 'hidden': !isValid })}>
                {isValid && (
                    <>
                        <div className='hover:bg-gray-100 p-1 hover:rounded cursor-pointer' onClick={() => setOpen(!open)}>
                            <IconDotsVertical size={24} />
                        </div>

                        {open && (
                            <div className='absolute z-10 -bottom-[86px] bg-gray-50 shadow-md max-w-[90px] w-full rounded-md'>
                                <ul>
                                    <li className='text-center hover:bg-blue-100 rounded-t-md border-b'>
                                        <Link href={`/edit-post/${postId}`} className='text-xs font-semibold rounded-t-md hover:text-blue-500 text-gray-700 p-3 block'>
                                            Editar
                                        </Link>
                                    </li>

                                    <li className='text-center hover:bg-rose-100 rounded-b-md'>
                                        <button
                                            type="button"
                                            className='text-xs font-semibold hover:text-rose-500 text-gray-700 p-3'
                                            onClick={handleDeleteClick}
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>


            {/**MODAL */}

            {openModal && (
                <div className=" fixed inset-0 z-30 flex justify-center items-center bg-gray-900 bg-opacity-40">
                    <div className="relative p-4 w-full max-w-md mx-auto">
                        <div className="relative bg-white rounded-lg shadow z-50">

                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                onClick={handleCloseModal}
                            >
                                <IconX size={25} />
                                <span className="sr-only">Close modal</span>
                            </button>

                            <div className="p-4 md:p-5 text-center">

                                <div className="flex justify-center">
                                    <IconAlertCircle size={50} className="text-gray-500" />
                                </div>

                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    ¿Estas seguro que deseas eliminar este post?
                                </h3>


                                <button
                                    type="button"
                                    disabled={loading}
                                    className={
                                        clsx(

                                            "text-white bg-red-600 hover:bg-red-800  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center",
                                            { 'cursor-not-allowed space-x-2': loading }
                                        )
                                    }
                                    onClick={handleConfirmDelete}
                                >


                                    <span>Sí, eliminar</span>
                                    <Image
                                        src={'/mini-spinner.svg'}
                                        width={20} height={20}
                                        alt='spinner'
                                        hidden={!loading}
                                    />
                                </button>

                                <button
                                    type="button"
                                    className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                                    onClick={handleCloseModal}
                                >
                                    No, cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
};