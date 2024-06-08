'use server'
import { User } from "@/interfaces";


export const register_user = async (data: User) => {
    const { name, lastName, email, password } = data
    const create_user = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/users/create-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, lastName, email, password })

    })
        .then(res => res.json())

    return create_user


}