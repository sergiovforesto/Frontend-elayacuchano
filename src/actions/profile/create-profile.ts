'use server'

// import { revalidatePath } from "next/cache"

export const create_profile = async (token: string, data: FormData) => {


    const new_profile = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/profile/create-profile`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,

        },
        body: data

    })
        .then(res => res.json())

    // revalidatePath(`/profile`)

    return new_profile




}