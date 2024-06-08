'use server'



export const confirm_token = async (token: string) => {

    const token_reset_password = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/change-password/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'

    })
        .then(res => res.json())

    return token_reset_password
}