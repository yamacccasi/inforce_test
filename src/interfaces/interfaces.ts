export interface IComment {
    id: number;
    productId: number;
    description: string;
    date: string;
}

export interface IProduct {
    description: string;
    id: number;
    imageUrl: string;
    name: string;
    count: number;
    size?: {
        width: number;
        height: number;
    };
    weight: string;
    comments: IComment[];
}

