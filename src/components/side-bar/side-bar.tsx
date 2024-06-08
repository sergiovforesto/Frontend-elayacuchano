import Link from "next/link";
import { IconAddressBook, IconHome, IconMenorah, IconMoodPuzzled, IconSunrise, IconTag } from "@tabler/icons-react";

export const SideBar = () => {

    return (
        <>
            <div className="hidden sm:block text-gray-700 ">
                <ul>
                    <li>
                        <Link href={'/'} className="flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700">
                            <IconHome size={24} className="mx-2" />
                            Inicio
                        </Link>
                    </li>

                    <li>
                        <Link href={'/about-us'} className="flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700">
                            <IconMoodPuzzled size={24} className="mx-2" />
                            Nosotros
                        </Link>
                    </li>

                    <li>
                        <Link href={'/contact'} className="flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700">
                            <IconAddressBook size={24} className="mx-2" />
                            Contacto
                        </Link>
                    </li>

                    <li>
                        <Link href={'/tags'} className="flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700">
                            <IconTag size={24} className="mx-2" />
                            Tags
                        </Link>
                    </li>

                    <li>
                        <Link href={'/culture'} className="flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700">
                            <IconMenorah size={24} className="mx-2" />
                            Cultura
                        </Link>
                    </li>

                    {/* <li>
                    <Link href={'/'} className="flex items-center py-2 px-4 rounded-lg hover:underline hover:bg-indigo-100 hover:text-indigo-700">
                        <IconSunrise size={24} className="mx-2" />
                        Turismo
                    </Link>
                </li> */}
                </ul>
            </div>


        </>

    )
}

