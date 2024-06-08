'use server'

export const confirm_user = async (token: string) => {

    const get_token = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/confirm-user/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }

    })
        .then(res => res.json())

    return get_token
}