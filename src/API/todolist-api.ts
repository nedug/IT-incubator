import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        'api-key': '084d9412-68c6-4e63-911d-1c542ec49ed0',
    },
};

export const todolistApi = {

    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
    },

    createTodolists(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings);
    },

    deleteTodolists(id: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings);
    },

    updateTodolists(id: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, settings)
    },
};