'use server'


export const get_summary_stats = async (token: string) => {

    const summary = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/posts/get-summary-stats`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store'

    })
        .then(res => res.json())

    return summary
}