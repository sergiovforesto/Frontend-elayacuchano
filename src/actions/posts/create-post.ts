'use server'

/**Deberías enviar el objeto FormData directamente. Además, no necesitas establecer el encabezado ‘Content-Type’ cuando envías un objeto FormData, ya que el navegador lo hará automáticamente por ti, incluyendo el límite necesario para separar las partes del formulario */
export const publish_post = async (token: string, data: FormData) => {


    const create_post = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/posts/create-post`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data

    })
        .then(res => res.json())



    return create_post




}