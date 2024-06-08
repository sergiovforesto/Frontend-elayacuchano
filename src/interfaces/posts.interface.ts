export interface Posts {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    authorName?: string;
    author?: {
        Profile?: {
            image?: string;
        }
    }
    Images?: [];
    Likes?: [
        {
            id: string;
            userId: string;
            postId: string;
            likes: number;
            isClicked: boolean;
        }
    ];
    Comments?: [];
    totalLikes?: number | 0;
    totalComments?: number | 0;
} 