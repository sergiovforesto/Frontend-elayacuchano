import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";
import Image from "next/image";
import { get_post_id, get_comments_by_post } from "@/actions";
import { Slider, SliderMobile } from "@/components";
import { formatTime, obtenerMes } from "@/utils";
import { IconMoodEmpty } from "@tabler/icons-react";
import { Comment, Posts } from "@/interfaces";
import { FormComment } from "../ui/create-comment";
import LikeButtonPost from "../ui/like-post";
import { EditButton } from '@/components/buttons/button-edit/edit-button';



interface Props {
    params: {
        id: string;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const postId = params.id

    const post: Posts = await get_post_id(postId)



    return {
        title: post?.title,
        description: post?.description,
        applicationName: "El Ayacuchano",
        keywords: [post?.title,
            'Amazonas', 'Puerto Ayacucho', 'Amazonas', 'Estado Amazonas',
            'Capital del Estado Amazonas', 'Noticias Puerto Ayacucho - Amazonas', 'Noticias Amazonas Venezuela'
        ],
        openGraph: {
            title: post?.title,
            description: post?.description,
            // images: [] //https://misitioweb.com/products/image.png
        },
    }
}


export default async function PostId({ params }: Props) {
    const { id } = params;

    const { post, ok } = await get_post_id(id)

    if (!ok) {
        notFound()
    }
    const { author, authorId } = post
    const { comments, commentCount } = await get_comments_by_post(post.id)


    return (


        <div className="sm:flex justify-center mt-7 mb-7 ">
            <div className="rounded-md bg-white border max-w-[672px] w-full">
                {
                    post?.Images.length === 0 ? (
                        null
                    ) : (

                        <header className="max-h-[500px]">
                            <div className="block md:hidden">
                                <SliderMobile images={post?.Images} />
                            </div>

                            <div className="hidden md:block">
                                <Slider images={post?.Images} />
                            </div>

                        </header>
                    )
                }


                <section className="">
                    <div className="p-3 sm:py-8 sm:px-12 ">
                        <div className="flex items-center gap-x-2 mb-6 ">


                            <div className="relative">
                                <Image
                                    className="w-9 md:w-10 h-9 md:h-10 rounded-full"
                                    width={36}
                                    height={36}
                                    src={post.author?.Profile?.image ? post.author?.Profile?.image : '/img-user-default.jpg'}
                                    quality={90}
                                    alt="img" />
                                <span className="bottom-0 left-7 absolute  w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>


                            <div className="flex flex-col justify-center">
                                <span className="text-sm font-semibold text-neutral-700">{author.name} {author.lastName}</span>
                                <span className="text-[11px] md:text-xs font-light">{obtenerMes(post.createdAt)}  {formatTime(post.createdAt)}</span>
                            </div>


                            {/**Boton Editar */}
                            <EditButton postId={post.id} authorId={authorId} />

                        </div>




                        <article className="">
                            <h1 className="font-extrabold text-xl md:text-4xl text-neutral-900 first-letter:uppercase mb-3 md:mb-5">
                                {post.title}
                            </h1>


                            <p className="mt-3 text-base text-justify leading-relaxed">
                                {post.description}
                            </p>


                        </article>

                        <div className="flex items-center mt-5 text-gray-500 like-container">
                            <LikeButtonPost postId={post.id} postlikes={post.Likes} />


                        </div>


                    </div>


                    <hr className="mb-5" />


                    <div className="p-3 sm:py-8 sm:px-12">
                        <h2 className="text-xl md:text-xl text-neutral-900 font-bold">Comentarios ({commentCount})</h2>


                        <FormComment postId={post.id} />

                        {/* Lista de comentarios */}
                        <div className="mt-10">
                            {
                                comments && comments.length > 0 ? (
                                    comments.map((comment: Comment) => (
                                        <div className="flex space-x-3 w-full mt-5" key={comment.id}>
                                            <div className="rounded-full">
                                                <Image
                                                    className="w-9 h-8 rounded-full"
                                                    width={30}
                                                    height={30}
                                                    src={comment.author?.Profile?.image ? comment.author?.Profile?.image : '/img-user-default.jpg'}
                                                    unoptimized
                                                    alt="img"
                                                />
                                            </div>

                                            <div className="w-full first-letter:uppercase">

                                                <span className="font-medium text-neutral-900 text-sm block mb-2">
                                                    {comment.author?.name} {comment.author?.lastName}
                                                </span>



                                                <div className="border rounded px-5 py-4">
                                                    <p className=" text-neutral-900">{comment.content}</p>

                                                </div>

                                                <span className="text-[11px] font-light text-xs block p-2">
                                                    {obtenerMes(comment.createdAt)}  {formatTime(comment.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center font-bold text-neutral-900 p-5">
                                        <h3 className="flex justify-center items-center gap-x-2 font-bold text-2xl">
                                            Sin comentarios
                                            <IconMoodEmpty />

                                        </h3>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </section>
            </div>

        </div>

    )
}
