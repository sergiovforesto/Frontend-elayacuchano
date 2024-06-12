'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    userId: string;
    name: string;
    lastName: string;
    role: string;
    inSession: boolean;
    createdAt: string | undefined;
}


export const RowUserTable = ({ userId, name, lastName, role, inSession, createdAt }: Props) => {

    const router = useRouter()

    return (
        <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer">

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {name} {lastName}
            </th>
            <td className="px-6 py-4 ">
                {role}
            </td>
            <td className="px-6 py-4 ">
                {inSession ? <span className="text-green-500">Online</span> : <span className="text-rose-500">Offline</span>}
            </td>
            <td className="px-6 py-4 ">
                {createdAt}
            </td>

            <td className="px-6 py-4 ">
                <Link href="#" className="font-medium text-blue-600 hover:underline">Editar</Link>
            </td>

        </tr>
    )

}