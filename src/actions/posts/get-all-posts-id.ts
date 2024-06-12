'use server'


export const get_all_posts_by_user = async (id: string, token: string, page?: number, limit?: number) => {

    const posts = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/posts/get-all-post/${id}?page=${page}&limit=${limit}`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store'


    })
        .then(res => res.json())



    return posts
}