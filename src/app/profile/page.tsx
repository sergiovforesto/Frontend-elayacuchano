import { titleAyacuchano } from "@/fonts/fonts";
import Link from "next/link";
import { ProfileUI } from "./ui/profile-ui";
import { Metadata } from "next";
import { Footer } from "@/components";


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

            <Footer />
        </div>



    )
}
