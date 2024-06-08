export interface Comment {
    id: string,
    content: string,
    isHidden: boolean,
    createdAt: Date,
    updatedAt: Date,
    authorId: string,
    postId: string,
    author?: {
        name: string;
        lastName: string;
        Profile?: {
            image: string;
        }
    }
}