'use server'


export const update_profile = async (token: string, data: FormData) => {


    const new_profile = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/profile/update-profile`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data

    })
        .then(res => res.json())


    return new_profile




}