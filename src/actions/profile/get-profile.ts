'use server'

export const get_profile = async (token: string, id: string) => {
    const profile_id = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/profile/get-profile/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },


    })
        .then(res => res.json())

    return profile_id
}