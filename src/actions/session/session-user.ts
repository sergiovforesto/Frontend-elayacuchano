'use server'


export const get_session_user = async (token: string) => {

    const auth_session = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/session`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'


    })
        .then(res => res.json())

    return auth_session
}