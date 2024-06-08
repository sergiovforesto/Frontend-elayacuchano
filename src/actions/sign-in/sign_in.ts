
interface LoginUser {
    email: string;
    password: string
}

export const sign_in = async (data: LoginUser) => {
    const { email, password } = data
    const log_in = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/login-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })

    })
        .then(res => res.json())

    return log_in
}