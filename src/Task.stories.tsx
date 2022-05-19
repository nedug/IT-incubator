import React from "react";
import Task from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
};


export const TaskExample = () => {
    return (
            <>
                <Task
                    id={'TaskID-2'}
                    title={'HTML'}
                    isDone={true}
                    todolistId={'TodoID1'}
                />
                <Task
                    id={'TaskID-1'}
                    title={'CSS'}
                    isDone={false}
                    todolistId={'TodoID2'}
                />
            </>
    )
};