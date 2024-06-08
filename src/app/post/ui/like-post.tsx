'use client'

import { create_like } from "@/actions";
import { ErrorsForms } from "@/interfaces";
import { useAuthSession } from "@/store/auth_session";
import { IconThumbUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    postId: string;
    postlikes?: {
        id: string;
        userId: string;
        postId: string;
        likes: number;
        isClicked: boolean;
    }[];
}

export default function LikeButtonPost({ postId, postlikes }: Props) {

    const [errors, setErrors] = useState<ErrorsForms>({ message: '', err: false, fields: '' })

    const router = useRouter()
    const session = useAuthSession(state => state.session_user)



    const handleLike = async () => {

        const like: number = 1
        const new_like = await create_like(session, like, postId)
        if (!new_like.ok) {
            setErrors({ message: new_like.msg, err: true, fields: '' })
            return
        }

        router.refresh()
    }
    const totalLikesForPost = getTotalLikesForPost(postlikes, postId);
    return (
        <button
            type="button"
            onClick={handleLike}
            className="flex items-center space-x-1 text-sm rounded-full bg-gray-50 border px-3 py-1 button-element"
        >

            <IconThumbUp size={24} className="icon" />
            <span className="">({totalLikesForPost}) Me gusta</span>
        </button>
    )
}

function getTotalLikesForPost(likesArray: Props["postlikes"], targetPostId: string): number {
    let totalLikes = 0;

    if (likesArray) {
        for (const like of likesArray) {
            if (like.postId === targetPostId) {
                totalLikes += like.likes;
            }
        }
    }

    return totalLikes;
}

