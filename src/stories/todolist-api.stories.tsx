import React, {useEffect, useState} from "react";
import {todolistApi} from "../API/todolist-api";


export default {
    title: 'TODOLIST-API',
};


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        // const {data} = await todolistApi.getTodolists();
        // setState(data);

        todolistApi.getTodolists()
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const title = 'VW POLO';

        todolistApi.createTodolists(title)
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '5f302d0e-9d95-4df5-b728-a5e59584ad74';

        todolistApi.deleteTodolists(todolistId)
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}


export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '5f302d0e-9d95-4df5-b728-a5e59584ad74';

        todolistApi.updateTodolists(todolistId, 'Amazing')
            .then(({data}) => setState(data))
    }, []);

    return <div>{JSON.stringify(state)}</div>;
}



