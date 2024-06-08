import { titleAyacuchano } from "@/fonts/fonts";
import Link from "next/link";
import { ProfileUI } from "./ui/profile-ui";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Crear tú perfil - El ayacuchano',
    description: 'Creando perfil en el ayacuchano',
}

export default async function Profile() {

    return (

        <div className="flex flex-col gap-y-7 items-center py-5 relative">
            <div className="mt-5">
                <Link href={'/'} className="flex items-center space-x-3">
                    <span className={`${titleAyacuchano.className} font-semibold text-xl`}>El Ayacuchano</span>
                </Link>
            </div>

            <ProfileUI />

            <footer className="mt-auto text-center py-5">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">© El ayacuchano. {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>



    )
}
