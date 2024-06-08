'use server'


export const get_all_posts = async (page?: number, limit?: number) => {

    const posts = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/posts/get-all-post?page=${page}&limit=${limit}`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'


    })
        .then(res => res.json())



    return posts
}