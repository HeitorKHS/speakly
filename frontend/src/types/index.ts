export interface Language{
    id: string,
    name: string,
    code: string,
};

export interface User{
    id: string,
    name: string,
    role: string,
    avatarUrl: string | null,
};