import { titleAyacuchano } from "@/fonts/fonts"
import Link from "next/link"
import { Metadata } from "next";
import { Suspense } from "react"
import { get_post_id } from "@/actions";
import { notFound } from "next/navigation";
import { UpdatePost } from "./ui/update-post";
import { NavBar } from "@/components";


export const metadata: Metadata = {
    title: 'Actualizar Post - El ayacuchano',
    description: 'Actualizar el post',
}

interface Props {
    params: {
        id: string
    }
}

export default async function EditPostId({ params }: Props) {
    const { id } = params



    return (

        <>

            <div className="sticky top-0 z-10">
                <div >
                    <NavBar />
                </div>
            </div>
            <div className="md:mx-20 xl:mx-32 mt-3 relative">
                <UpdatePost postId={id} />

            </div>

        </>

    )
}
