'use server'

export const delete_post_id = async (token: string, postId: string) => {
    const delete_post = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/posts/delete-post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },


    })
        .then(res => res.json())


    return delete_post
}