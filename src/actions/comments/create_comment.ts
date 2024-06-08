'use server'
import { revalidatePath } from "next/cache"


export const create_comment = async (token: string, postId: string, content: string) => {
    const posted_comment = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/comments/create-comment/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content })

    })
        .then(res => res.json())

    revalidatePath(`/post/${postId}`)

    return posted_comment
}