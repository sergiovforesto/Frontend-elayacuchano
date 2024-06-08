import { titleAyacuchano } from "@/fonts/fonts";
import Link from "next/link";
import { CreatePostUI } from "./ui/create-post-ui";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Crear Post - El ayacuchano',
    description: 'Haz tu publicación en el ayacuchano',
}

export default function CreatePost() {


    return (
        <main className="md:mx-20 xl:mx-32 relative">
            <nav className="my-5 space-x-4">
                <Link href="/" className="flex items-center justify-center space-x-3">
                    <span className={`${titleAyacuchano.className} font-semibold text-xl`}>El Ayacuchano</span>
                </Link>

            </nav>

            <CreatePostUI />


        </main>
    )
}
