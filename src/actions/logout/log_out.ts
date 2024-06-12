'use server'

export const log_out = async (email: string, token: string) => {

    const logout = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/logout-user`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })

    })
        .then(res => res.json())

    return logout
}