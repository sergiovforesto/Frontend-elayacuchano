export const new_password = async (token: string, password: string) => {

    const new_pass = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/change-password/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })

    })
        .then(res => res.json())

    return new_pass
}