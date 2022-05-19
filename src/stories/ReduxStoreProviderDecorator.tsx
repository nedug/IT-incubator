import React from 'react';
import {AppRootStateType} from "../State/store";
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../State/tasksReducer";
import {SortedTask, todoListReducer} from "../State/todoListReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
});

const initialGlobalState = {
    todoLists: [
        {id: 'TodoID1', title: 'What to learn', filter: SortedTask.all},
        {id: 'TodoID2', title: 'What to buy', filter: SortedTask.completed},
    ],
    tasks: {
        ['TodoID1']: [
            {id: 'TaskID-1', title: 'HTML&CSS', isDone: true},
            {id: 'TaskID-2', title: 'JS', isDone: true},
        ],
        ['TodoID2']: [
            {id: 'TaskID-1', title: 'Milk', isDone: true},
            {id: 'TaskID-2', title: 'Book', isDone: false},
        ],
    }
};

export const storybookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>;
};