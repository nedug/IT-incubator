import React from 'react';
import {AppRootStateType} from "../State/store";
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../State/tasksReducer";
import {SortedTask, todoListReducer} from "../State/todoListReducer";
import {v1} from "uuid";


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
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
        ],
        ['TodoID2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ],
    }
};

export const storybookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>;
};