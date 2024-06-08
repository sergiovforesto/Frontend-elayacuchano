'use server'

import { revalidatePath } from "next/cache"

export const create_like = async (token: string, like: number, postId: string) => {


    const like_post = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/likes/new-like/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ likes: like })

    })
        .then(res => res.json())

    revalidatePath(`/post/${postId}`)


    return like_post




}