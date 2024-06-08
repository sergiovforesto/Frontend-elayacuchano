'use server'



export const reset_password = async (email: string) => {

    const change_password = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })

    })
        .then(res => res.json())

    return change_password
}