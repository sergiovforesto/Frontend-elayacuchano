'use client'
import { useState } from "react"
import { IconDotsVertical } from "@tabler/icons-react"
import Link from "next/link"
import useSessionContext from "@/hook/useSession"
import clsx from "clsx"
interface Props {
    postId: string;
    authorId: string;
}

export const EditButton = ({ postId, authorId }: Props) => {
    const [open, setOpen] = useState(false);
    const { id } = useSessionContext();

    const isValid = id === authorId;

    return (
        <div className={clsx('flex flex-grow justify-end items-center relative', { 'hidden': !isValid })}>
            {isValid && (
                <>
                    <div className='hover:bg-gray-100 p-1 hover:rounded cursor-pointer' onClick={() => setOpen(!open)}>
                        <IconDotsVertical size={20} />
                    </div>

                    {open && (
                        <div className='absolute z-10 -bottom-11 bg-gray-50 shadow-md max-w-[90px] w-full rounded-md'>
                            <ul>
                                <li className='text-center hover:bg-gray-100 rounded-md'>
                                    <Link href={`/edit-post/${postId}`} className='text-xs font-semibold hover:text-blue-500 text-gray-700 p-3 block'>
                                        Editar
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};