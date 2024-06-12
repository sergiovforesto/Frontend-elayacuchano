'use server'


export const get_all_users = async (token: string, page?: number, limit?: number) => {

    const get_users = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/get-all-users?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'


    })
        .then(res => res.json())

    return get_users
}