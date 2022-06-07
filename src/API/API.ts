import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '084d9412-68c6-4e63-911d-1c542ec49ed0',
    },
});

export const API = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, id: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`);
    },
    updateTask(todolistId: string, id: string, updateTaskModel: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: UpdateTaskModelType }>>(`todo-lists/${todolistId}/tasks/${id}`, updateTaskModel);
    },
};


// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TasksStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TasksPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string
    title: string
    status: TasksStatus
    priority: TasksPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TasksStatus
    priority: TasksPriority
    startDate: string
    deadline: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type ResponseTaskType = {
    items: Array<TaskType>
    totalCount: number
    error: null | string
}