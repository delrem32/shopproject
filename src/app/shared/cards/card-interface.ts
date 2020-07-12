export interface CardInterface {
    _id: string;
    name: string;
    type?: string;
    description?: string;
    quantity: number;
    files?: string[];
}

export interface Thumbnail {
    url: string;
    title?: string;
}
