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


const settings = {
    withCredentials: true,
    headers: {
        'api-key': '084d9412-68c6-4e63-911d-1c542ec49ed0',
    },
};

export const todolistApi = {

    getTodolists() {
        return axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
    },

    createTodolists(title: string) {
        return axios.post<ResponseType<{ item: TodolistType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings);
    },

    deleteTodolists(id: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings);
    },

    updateTodolists(id: string, title: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, settings)
    },
};