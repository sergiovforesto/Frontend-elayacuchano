'use client'
import { useEffect, useState } from 'react';
import { Posts } from "@/interfaces";
import { PostsList } from './posts-list';
import { get_all_posts } from '@/actions';



export default function LatestPosts() {


    const [posts, setPosts] = useState<Posts[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPost, setTotalPosts] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)

    const pageLimit = 6;


    useEffect(() => {

        const getPosts = async () => {

            const { ok, posts: newPosts, totalPosts } = await get_all_posts(page, pageLimit)

            if (!ok) {
                console.log('Post no encontrados')
                return
            }

            // Concatenar nuevos posts con los existentes
            setPosts(prevPosts => {
                // Crea un nuevo array con todos los posts antiguos
                const updatedPosts = [...prevPosts];
                // Agrega solo los posts nuevos que no están ya en el array
                newPosts.forEach((post: Posts) => {
                    if (!updatedPosts.some(existingPost => existingPost.id === post.id)) {
                        updatedPosts.push(post);
                    }
                });
                return updatedPosts;
            });
            setTotalPosts(Math.ceil(totalPosts / pageLimit));
        }

        getPosts()

    }, [page])

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

        <PostsList
            posts={posts}
            totalPosts={totalPost}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
        />

    )
}
