'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { countries } from "@/utils"
import useSessionContext from "@/hook/useSession"
import { create_profile, get_profile, update_profile } from "@/actions"
import { useAuthSession } from "@/store/auth_session"
import { ErrorsForms } from "@/interfaces"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from "clsx"


interface Profile {
    id?: string
    bio: string
    country: string
    education: string
    image?: FileList | null
    userId?: string
}
export const ProfileUI = () => {

    const [profile, setProfile] = useState<Profile>({
        bio: '',
        country: '',
        education: '',
        image: null

    })
    const [imageUser, setImageUser] = useState(null)

    const [dataUser, setDataUser] = useState({
        name: '',
        lastName: '',
        email: '',

    })

    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })
    const [update, setUpdate] = useState({
        new_profile: false,
        old_profile: {
            id: '',
            bio: '',
            country: '',
            education: '',
            image: null
        } as Profile

    })



    const { id, name, lastName, email } = useSessionContext()
    const session = useAuthSession(state => state.session_user || '')
    const router = useRouter()
    const notify = (msg: string) => toast.success(msg);


    useEffect(() => {
        const getUser = async () => {
            if (!session) {

                router.replace('/')
                return
            }

            setDataUser({
                ...dataUser,
                name: name || '',
                lastName: lastName || '',
                email: email || ''

            })
        }
        getUser()
    }, [session, id])

    useEffect(() => {
        const getProfile = async () => {
            if (!id) return

            const user_profile = await get_profile(session, id)
            if (user_profile?.msg) {
                setUpdate({
                    new_profile: false, old_profile: {
                        bio: '',
                        country: '',
                        education: '',
                        image: null
                    }
                })
            } else {

                setUpdate({ new_profile: true, old_profile: { ...user_profile?.Profile } })
            }

            if (user_profile?.Profile) {

                setProfile({
                    ...profile,
                    bio: user_profile?.Profile?.bio,
                    country: user_profile?.Profile?.country,
                    education: user_profile?.Profile?.education,
                })

                setImageUser(user_profile?.Profile?.image)
            }
        }

        getProfile()
    }, [session, id])


    const createProfileUser = async () => {

        if (update.new_profile) {


            const { id, userId, ...old } = update.old_profile


            if (old.bio === profile.bio || old.country === profile.country || old.education === profile.country) {
                setErrors({ message: 'No hay cambios nuevos para actualizar', err: true })
                return
            }

            const new_profile = profile

            if (Object.values(new_profile).includes('')) {
                setErrors({ message: 'Campos requeridos', err: true, fields: '' })
                return
            }

            const formDatos = new FormData()

            formDatos.append('bio', new_profile.bio)
            formDatos.append('country', new_profile.country)
            formDatos.append('education', new_profile.education)

            if (new_profile.image) {
                formDatos.append('image-profile', new_profile.image[0])
            }

            const update_profile_user = await update_profile(session, formDatos)

            if (!update_profile_user.ok) {
                setErrors({ message: update_profile_user.msg, err: true, fields: 'Error to Create Profile' })
                return
            }

            notify('Actualizado Exitosamente!✔')

            setTimeout(() => {
                router.refresh()
            }, 2000);
            return

        }


        //CREAR PROFILE
        if (Object.values(profile).includes('')) {
            setErrors({ message: 'Campos requeridos', err: true, fields: '' })
            return
        }

        const formdata = new FormData()

        formdata.append('bio', profile.bio)
        formdata.append('country', profile.country)
        formdata.append('education', profile.education)

        if (profile.image) {
            formdata.append('image-profile', profile.image[0])
        }


        const created_profile = await create_profile(session, formdata)
        if (!created_profile.ok) {
            setErrors({ message: created_profile.msg, err: true, fields: 'Error to Create Profile' })
            return
        }

        notify('Guardado Exitosamente✅')


    }

    const { message, err } = errors

    return (
        <>
            <div className="bg-white border rounded-md px-5 py-8 max-w-[672px] w-full">
                <h2 className="font-bold text-2xl text-neutral-900">Usuario</h2>

                <div className="mt-5">
                    <label htmlFor="nombre" className="font-medium mb-2 block">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={dataUser.name}
                        onChange={(e) => setDataUser({ ...dataUser, name: e.target.value.toLowerCase() })}
                        className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg placeholder:text-neutral-900"
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="apellido" className="font-medium mb-2 block">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        value={dataUser.lastName}
                        onChange={(e) => setDataUser({ ...dataUser, lastName: e.target.value.toLowerCase() })}
                        className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg placeholder:text-neutral-900"
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="email" className="font-medium mb-2 block">Email</label>
                    <p className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg">{email}</p>
                </div>


                <div className="mt-5">
                    <label htmlFor="imagen" className="font-medium mb-2 block">Imagen de perfil</label>
                    <div className="flex items-center gap-x-3">
                        <Image
                            className="w-9 h-9 rounded-full"
                            width={36}
                            height={36}
                            src={imageUser ? imageUser : '/img-user-default.jpg'}
                            quality={90}
                            alt="img"
                        />
                        <label className="text-sm text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded hover:cursor-pointer" htmlFor="imagen">
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                className="hidden"
                                id="imagen"
                                onChange={(e) => {

                                    if (e.target.files) {
                                        // Si hay un archivo, actualiza el estado del perfil con la imagen
                                        setProfile({ ...profile, image: e.target.files });
                                    }
                                }}


                            />
                            Seleccionar Imagen
                        </label>
                    </div>
                </div>

            </div>

            <div className="bg-white border rounded-md px-5 py-8 max-w-[672px] w-full relative">
                <h2 className="font-bold text-2xl text-neutral-900">Información Básica</h2>


                <div className="mt-5">
                    <label htmlFor="educacion" className="font-medium mb-2 block">Educación</label>
                    <input
                        type="text"
                        id="educacion"
                        value={profile.education}
                        onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                        placeholder="ej: Estudiante, Profesor etc..."
                        className={
                            clsx(
                                'block w-full p-2 text-gray-900 border border-gray-300 rounded-lg',
                                { 'border-rose-500': err }
                            )
                        }
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="paises" className="font-medium mb-2 block">País</label>
                    <select
                        id="paises"
                        value={profile.country}
                        onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                        className={
                            clsx(
                                'w-full p-2 text-gray-900 border border-gray-300 rounded-lg',
                                { 'border-rose-500': err }
                            )
                        }

                    >
                        <option value="" disabled>Seleccione un país</option>
                        {
                            countries.map((country) => (
                                <option key={country.id}>{country.name}</option>
                            ))
                        }
                    </select>
                </div>


                <div className="mt-5">
                    <label htmlFor="bio" className="font-medium mb-2 block">Bio</label>
                    <input
                        type="text"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Escribe una biografía corta..."
                        id="bio"
                        className={
                            clsx(
                                'block w-full p-2 text-gray-900 border border-gray-300 rounded-lg',
                                { 'border-rose-500': err },
                                { 'border-gray-300': err && setTimeout(() => setErrors({ message: '', err: false }), 10000) }
                            )
                        }
                    />
                </div>


                {err ? <p className="text-xs text-rose-600 font-light mt-1">{message}</p> : ''}
            </div>
            <div className="bg-white border rounded-md px-4 py-4 max-w-[672px] w-full flex items-center">

                <button
                    type="button"
                    onClick={createProfileUser}
                    className='bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded w-full'
                >
                    {update.new_profile ? 'Actualizar Información' : 'Guardar Cambios'}
                </button>
            </div>


            <ToastContainer />

        </>
    )
}




