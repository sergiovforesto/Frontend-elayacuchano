import { titleAyacuchano } from "@/fonts/fonts";
import Link from "next/link";
import { CreatePostUI } from "./ui/create-post-ui";
import { Metadata } from "next";
import { NavBar } from "@/components";


export const metadata: Metadata = {
    title: 'Crear Post - El ayacuchano',
    description: 'Haz tu publicación en el ayacuchano',
}

export default function CreatePost() {


    return (
        <>
            <div className="sticky top-0 z-10">
                <div >
                    <NavBar />
                </div>
            </div>

            <main className="md:mx-20 xl:mx-32 mt-3 relative">


                <CreatePostUI />


            </main>
        </>
    )
}
