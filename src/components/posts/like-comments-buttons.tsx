
import { IconThumbUp, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
    postId: string;
    Likes: {
        id: string;
        userId: string;
        postId: string;
        likes: number;
        isClicked: boolean;
    }[]
    totalComments: number | 0
}



function getTotalLikesForPost(likesArray: Props["Likes"], targetPostId: string): number {
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

export default function LikeCommentsButtons({ postId, Likes, totalComments }: Props) {

    const totalLikesForPost = getTotalLikesForPost(Likes, postId);
    return (

        <div className="flex items-center space-x-4 mt-4 text-gray-500 ">
            <Link
                href={`/post/${postId}`}
                className="flex items-center text-sm rounded-full px-3 py-1 bg-slate-50 hover:bg-gray-100 border button-element hover:text-blue-900"
            >
                <IconThumbUp size={20} className="text-blue-900 hover:fill-blue-300 icon" />
                <span>{totalLikesForPost} Me gusta</span>
            </Link>

            <Link href={`/post/${postId}`} className="flex items-center text-sm rounded-full bg-slate-50 hover:bg-gray-100 border px-3 py-1 cursor-pointer hover:text-blue-900">
                <IconMessageCircle size={20} />
                <span>{totalComments} Comentar</span>
            </Link>

        </div>
    )
}
