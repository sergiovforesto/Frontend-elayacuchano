'use client'
import { useEffect, useRef, useState } from 'react';
import { Posts } from "@/interfaces";
import { PostsList } from './posts-list';
import { get_all_posts } from '@/actions';



// interface Props {
//     posts: Posts[]
//     setPage?: (num: number) => void
// }

export default function LatestPosts() {


    const [posts, setPosts] = useState<Posts[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPost, setTotalPosts] = useState<number>(0)


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


    return (
        <PostsList
            posts={posts}
            setPosts={setPosts}
            totalPosts={totalPost}
            page={page}
            setPage={setPage}
        />
    )
}
