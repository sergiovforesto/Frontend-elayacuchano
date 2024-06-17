'use client'
import '@/app/styles/spinner.css'
import { useState, useRef, useEffect } from "react";
import { Posts } from "@/interfaces";
import { obtenerMes, formatTime } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import LikeCommentsButtons from "./like-comments-buttons";



interface ImageObject {
    id: string;
    url: string;
    postId: string;
}
interface Props {
    posts: Posts[];
    totalPosts?: number
    page?: number;
    setPage?: (update: (prevPage: number) => number) => void;
}

export const PostsList = ({ posts, totalPosts = 0, page = 1, setPage = (update: (prevPage: number) => number) => { } }: Props) => {
    const articleRef = useRef<HTMLElement | null>(null);
    const [postInView, setPostInView] = useState<boolean | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (!articleRef.current || isLoading) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && page < totalPosts && !isLoading) {
                    setIsLoading(true);
                    setPage((prevPage: number) => prevPage + 1);
                }
            })
        }, {
            rootMargin: '0px 0px 0px 0px',
            threshold: 1.0
        })
        const postEnPantalla = document.querySelectorAll('#id-article')
        let lastPost = postEnPantalla[postEnPantalla.length - 1]

        if (lastPost) {
            observer.observe(lastPost);
        }

        // Limpiar el observer al desmontar
        return () => {
            observer.disconnect();
        };

    }, [posts, page, totalPosts, isLoading])


    useEffect(() => {

        if (posts.length === 0) {
            setIsLoading(false);
            return
        }

        if (posts.length && isLoading) {
            setIsLoading(false);
        }
    }, [posts]);


    return (
        <>
            {posts.length === 0 && (
                <div className={`${isLoading ? 'hidden' : 'bg-white p-5 rounded-lg flex items-center justify-center max-h-[200px] h-full'} `}>
                    <h3>No hay publicaciones 😥</h3>
                </div>
            )}
            {posts.map((post: Posts) => (
                <article id='id-article' ref={articleRef} key={post.id} className="rounded-lg bg-white border" >

                    {
                        post.Images?.length === 0 ? (
                            null
                        ) : (
                            post.Images?.map((img: ImageObject) => (

                                <div className="h-[400px] bg-neutral-950 rounded-t-lg" key={img.id}>
                                    <Image
                                        src={img.url}
                                        width={400}
                                        height={300}
                                        className={'w-full h-[400px] rounded-t-lg object-contain'}
                                        alt={img.postId}
                                    />
                                </div>
                            )) ?? []
                        )
                    }


                    <div className="p-5" >

                        <div className="flex items-center space-x-2 mb-3">
                            <div className="relative">
                                <Image
                                    className="w-9 h-9 rounded-full"
                                    width={30}
                                    height={30}
                                    src={post.author?.Profile?.image ? post.author?.Profile?.image : '/img-user-default.jpg'}
                                    alt="img"
                                    unoptimized
                                />

                                <span className="bottom-0 left-7 absolute  w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>


                            <div className="flex flex-col justify-center">
                                <span className="text-sm font-semibold text-gray-700">{post.authorName}</span>
                                <span className="text-[11px] font-light">{obtenerMes(post.createdAt)}  ({formatTime(post.createdAt)})</span>
                            </div>
                        </div>


                        <div className="md:pl-11">
                            <Link href={`/post/${post.id}`}>
                                <h2 className="text-xl sm:text-3xl font-bold text-neutral-900 first-letter:uppercase hover:text-blue-800 hover:underline">
                                    {post.title}
                                </h2>
                            </Link>
                            {/**TAGS */}
                            {/* <div className="flex flex-wrap gap-2 sm:gap-0 sm:flex-row sm:space-x-3 mt-3">

                                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">#Badge</span>
                                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500">#Badge</span>
                                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800 ">#Badge</span>
                                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">#Badge</span>
                            </div> */}

                            <LikeCommentsButtons
                                postId={post.id}
                                Likes={post.Likes ?? []}
                                totalComments={post.totalComments || 0}
                            />
                        </div>
                    </div >
                </article >



            )
            )}


            {
                isLoading && (
                    <div className='flex justify-center items-center h-screen'>
                        <div className="sk-cube-grid">
                            <div className="sk-cube sk-cube1"></div>
                            <div className="sk-cube sk-cube2"></div>
                            <div className="sk-cube sk-cube3"></div>
                            <div className="sk-cube sk-cube4"></div>
                            <div className="sk-cube sk-cube5"></div>
                            <div className="sk-cube sk-cube6"></div>
                            <div className="sk-cube sk-cube7"></div>
                            <div className="sk-cube sk-cube8"></div>
                            <div className="sk-cube sk-cube9"></div>
                        </div>
                    </div>
                )
            }


        </>
    )
}