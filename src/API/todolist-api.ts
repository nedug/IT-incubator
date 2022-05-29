import axios from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '084d9412-68c6-4e63-911d-1c542ec49ed0',
    },
})

export const todolistApi = {

    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },

    createTodolists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});
    },

    deleteTodolists(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`);
    },

    updateTodolists(id: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title})
    },
};