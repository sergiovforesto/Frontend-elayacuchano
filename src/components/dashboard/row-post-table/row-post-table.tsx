'use client'
import Link from "next/link";
interface Props {
    postId: string;
    title: string;
    description: string;
    createdAt: string;
}


export const RowPostTable = ({ postId, title, description, createdAt }: Props) => {


    return (

        <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer">

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <Link href={`/post/${postId}`} className='text-blue-600'>
                    {title}
                </Link>
            </th>
            <td className="px-6 py-4 ">
                {description}
            </td>
            <td className="px-6 py-4 ">
                {createdAt}
            </td>

            <td className="px-6 py-4 ">
                <Link href={`/edit-post/${postId}`} className="font-medium text-blue-600 hover:underline">Editar</Link>
            </td>

        </tr>
    )
}