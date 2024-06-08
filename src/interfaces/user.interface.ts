
export interface User {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
    token?: string;
    isAuth?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}