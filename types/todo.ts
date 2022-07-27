export interface Todo {
    id: number;
    user_id: string;
    content: string;
    completed: boolean;
}

export interface TodoInput {
    content: string;
}