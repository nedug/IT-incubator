import React, {useEffect, useState} from "react";
import axios from "axios";


export default {
    title: 'TODOLIST-API',
};

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '084d9412-68c6-4e63-911d-1c542ec49ed0',
    },
};


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then(res => {
                setState(res.data);
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'test Pasha'}, settings)
            .then(res => {
                console.log(res);
                setState(res.data);
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/b0170708-2abe-421c-b7d3-766075291adb', settings)
            .then(res => {
                setState(res.data);
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/5f302d0e-9d95-4df5-b728-a5e59584ad74', {title: 'Something NEW'}, settings)
            .then(res => {
                setState(res.data);
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}



