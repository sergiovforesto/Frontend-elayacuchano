'use server'


export const get_post_id = async (postId: string) => {
    const post_id = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/posts/get-post/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'


    })
        .then(res => res.json())


    return post_id
}