import React from 'react';
import {AppRootStateType} from '../State/store';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from '../State/tasks-Reducer';
import {SortedTask, todoListReducer} from '../State/todolist-Reducer';
import {v1} from 'uuid';
import {TasksPriority, TasksStatus} from '../API/API';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
});

const initialGlobalState = {
    todoLists: [
        {id: 'TodoID1', title: 'What to learn', filter: SortedTask.all, addedDate: '', order: 0},
        {id: 'TodoID2', title: 'What to buy', filter: SortedTask.completed, addedDate: '', order: 0},
    ],
    tasks: {
        ['TodoID1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TasksStatus.New,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'TodoID1',
            },
            {id: v1(), title: 'JS', status: TasksStatus.Completed,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'TodoID1',},
        ],
        ['TodoID2']: [
            {id: v1(), title: 'Milk', status: TasksStatus.Completed,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'TodoID2',},
            {id: v1(), title: 'Book', status: TasksStatus.New,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'TodoID2',},
        ],
    }
};

export const storybookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>;
};