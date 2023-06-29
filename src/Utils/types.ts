export interface Comment {
    readerId: string;
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timestamp: any ;
    likes: Array<string>;
}