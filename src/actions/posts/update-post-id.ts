'use server'

export const update_post = async (token: string, postId: string, data: FormData) => {


    const up_post = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/posts/update-post/${postId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data,
        cache: 'no-store'

    })
        .then(res => res.json())


    return up_post




}