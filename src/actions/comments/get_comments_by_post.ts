'use server'

export const get_comments_by_post = async (postId: string) => {

    const comments = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/comments/get-comment-list/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'


    })
        .then(res => res.json())

    return comments
}