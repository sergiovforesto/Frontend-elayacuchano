'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import clsx from "clsx"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { ErrorsForms } from "@/interfaces"
import { useRouter } from "next/navigation"
import { useAuthSession } from "@/store/auth_session"
import { IconCloudUpload } from "@tabler/icons-react"
import { update_post } from "@/actions"


interface Props {
    postId: string;
}

export const UpdatePost = ({ postId }: Props) => {

    const router = useRouter()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [images, setImages] = useState<FileList | null>(null);

    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })
    const [success, setSuccess] = useState('')

    const [loading, setLoding] = useState(false)

    const session = useAuthSession(state => state.session_user)
    const notify = (msg: string) => toast.success(msg);


    useEffect(() => {
        if (!session) {
            router.replace('/')
            return
        }
    }, [session])




    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files

            if (files.length > 6) {
                setErrors({ message: 'Maximo 6 images por post', err: true })
                return
            }
            setImages(files);
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setImagePreviews((prevImages) => prevImages.concat(fileArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file as any)
            );
        }
    };



    const onUpdatePost = async () => {

        setLoding(true);
        if (!session) {
            setLoding(false);
            return;
        }

        if ([title, description].includes('')) {
            setErrors({ message: 'Campos requeridos', err: true })
            setLoding(false)
            return
        }

        try {

            const formdata = new FormData();
            formdata.append('title', title);
            formdata.append('description', description);

            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formdata.append('images', images[i]);
                }
            }

            const my_new_post = await update_post(session, postId, formdata)
            if (!my_new_post.ok) {
                setErrors({ message: my_new_post.msg, err: true })
                return
            }

            setSuccess('Post Actualizado.')
            notify('Actualizado Correctamente')


            setTimeout(() => {
                router.replace('/')
            }, 3000);


            setLoding(false)
        } catch (error) {
            console.log(error)
        }



    }


    const { message, err } = errors

    return (

        <>
            <div className="space-y-5 py-5">
                <h1 className='text-gray-900 font-extrabold text-xl md:text-2xl underline'>Actualizar Post</h1>

                <div>
                    <h2 className="font-bold sm:text-lg text-gray-800 mb-2">Subir Imagenes (opcional)</h2>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className={
                            clsx(
                                "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
                                {
                                    'hidden': imagePreviews.length >= 1
                                }
                            )
                        }>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <IconCloudUpload />
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 6 imagenes)</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                multiple
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>

                        <div className={
                            clsx(
                                { 'flex items-center overflow-x-auto slider-container max-h-[600px] w-full bg-neutral-900': imagePreviews.length >= 1 }
                            )
                        }>

                            {

                                imagePreviews.map((image, index) => (
                                    <Image key={index} src={image} width={400} height={400} alt={image} className='object-contain aspect-video w-[400px] h-[400px]' />
                                ))
                            }

                        </div>

                    </div>



                </div>

                <div className=''>
                    <h2 className="font-bold sm:text-lg text-gray-800 mb-2">Titulo</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 placeholder:text-3xl md:placeholder:text-4xl placeholder:font-extrabold  text-3xl md:text-4xl font-extrabold text-gray-700 rounded-lg block w-full p-2.5"
                        placeholder="Nuevo titulo"
                        required
                    />
                </div>

                <div className='' >
                    <h2 className='font-bold sm:text-lg text-gray-800 mb-2'>Descripción</h2>

                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block p-2.5 w-full text-sm sm:text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        placeholder="Descripción del post">

                    </textarea>
                </div>
                {err ? <p className="text-xs text-rose-600 font-light">{message}</p> : ''}


                <button
                    type="button"
                    onClick={onUpdatePost}
                    disabled={loading}
                    className={
                        clsx(
                            "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 cursor-pointer",
                            { 'cursor-not-allowed space-x-2': loading }
                        )
                    }
                >
                    <span>Actualizar post</span>
                    <Image
                        src={'/mini-spinner.svg'}
                        width={20} height={20}
                        alt='spinner'
                        hidden={!loading}
                    />
                </button>
            </div>


            <ToastContainer />
        </>
    )
}