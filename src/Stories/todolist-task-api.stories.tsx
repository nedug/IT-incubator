import React, {useEffect, useState} from 'react';
import {API} from '../API/API';


export default {
    title: 'TODOLIST-TASK-API',
};


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        API.getTodolists()
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const title = 'VW POLO';

        API.createTodolist(title)
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '35a6b380-3e0d-4220-9225-354637c56449';

        API.deleteTodolist(todolistId)
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '5f302d0e-9d95-4df5-b728-a5e59584ad74';

        API.updateTodolist(todolistId, 'Amazing')
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const GetTasks = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'a6eb6283-e156-449c-97e1-84cb8e79481f';

        API.getTasks(todolistId)
            .then(({data: {items}}) => setState(items))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const CreateTask = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'a6eb6283-e156-449c-97e1-84cb8e79481f';
        const title = 'Nissan';

        API.createTask(todolistId, title)
            .then(({data: {data: {item}}}) => setState(item))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const DeleteTask = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'a6eb6283-e156-449c-97e1-84cb8e79481f';
        const taskId = '674698f0-3ea4-4c9c-a706-02bee5e95289';

        API.deleteTask(todolistId, taskId)
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const UpdateTask = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'a6eb6283-e156-449c-97e1-84cb8e79481f';
        const taskId = 'b5bebc47-7166-45c2-8f90-8f1d22a9add4';
        const updateTaskModel = {
            title: 'SSSSS TYYYY',
            description: '',
            status: 1,
            priority: 1,
            startDate: '',
            deadline: '',
        };

        API.updateTask(todolistId, taskId, updateTaskModel)
            .then(({data: {data: {item}}}) => setState(item))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}