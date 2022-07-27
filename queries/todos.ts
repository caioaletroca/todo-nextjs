import { TodoInput } from "types";
import axios from "./axios";

export async function getTodos() {
    return (await axios.get('/todos'))?.data;
}

export async function createTodo(body: TodoInput) {
    return (await axios.post('/todos', body))?.data;
}

export function deleteTodo(id: number) {
    return axios.delete(`/todos/${id}`);
}