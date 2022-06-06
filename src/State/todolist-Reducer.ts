import {v1} from 'uuid';
import {AppRootStateType} from './store';
import {API, TodolistType} from '../API/API';
import {Dispatch} from 'redux';


export enum SortedTask {
    all = 'All',
    active = 'Active',
    completed = 'Completed',
}

export type TodoListCommonType = TodolistType & {
    filter: SortedTask
}

export type RemoveTodolistActionType = {
    type: 'TODOLIST/REMOVE-TODOLIST'
    payload: { todolistId: string }
}
export type AddTodolistActionType = {
    type: 'TODOLIST/ADD-NEW-TODOLIST'
    payload: { newTodolistTitle: string, todolistId: string }
}
type ChangeTodolistTitleActionType = {
    type: 'TODOLIST/CHANGE-TODOLIST-TITLE'
    payload: { newTodolistTitle: string, todolistId: string }
}
type ChangeTodolistFilterActionType = {
    type: 'TODOLIST/CHANGE-TODOLIST-FILTER'
    payload: { filter: SortedTask, todolistId: string }
}
export type SetTodolistsActionType = {
    type: 'TODOLIST/SET-TODOLISTS'
    payload: { todolists: Array<TodolistType> }
}

type todoListReducerType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
    | SetTodolistsActionType


const initialState: Array<TodoListCommonType> = [
    /*{id: todoListID1, title: 'What to learn', filter: SortedTask.all, addedDate: '', order: 0},
    {id: todoListID2, title: 'What to buy', filter: SortedTask.completed, addedDate: '', order: 0},*/
];

export const todoListReducer = (state: Array<TodoListCommonType> = initialState, action: todoListReducerType): Array<TodoListCommonType> => {
    switch (action.type) {

        case 'TODOLIST/REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }

        case 'TODOLIST/ADD-NEW-TODOLIST': {
            const newTodolist: TodoListCommonType = {
                id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: SortedTask.all,
                addedDate: '', order: 0,
            };
            return [newTodolist, ...state]
        }

        case 'TODOLIST/CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTodolistTitle} : tl)
        }

        case 'TODOLIST/CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }

        case 'TODOLIST/SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter: SortedTask.all}))
        }

        default:
            return state;
    }
};


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'TODOLIST/REMOVE-TODOLIST',
        payload: {todolistId,},
    }
};

export const addNewTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
        type: 'TODOLIST/ADD-NEW-TODOLIST',
        payload: {newTodolistTitle, todolistId: v1(),},
    }
};

export const changeTitleTodolistAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'TODOLIST/CHANGE-TODOLIST-TITLE',
        payload: {newTodolistTitle, todolistId,},
    }
};

export const changeFilterTodolistAC = (todolistId: string, filter: SortedTask): ChangeTodolistFilterActionType => {
    return {
        type: 'TODOLIST/CHANGE-TODOLIST-FILTER',
        payload: {todolistId, filter,},
    }
};

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {
        type: 'TODOLIST/SET-TODOLISTS',
        payload: {todolists,},
    }
};


export const fetchTodolistsTC = () => { /* Thunk-Creator */
    return (dispatch: Dispatch) => {
        API.getTodolists()
            .then(({data}) => dispatch(setTodolistsAC(data)))
    }
};


export const selectTodoLists = (state: AppRootStateType): Array<TodoListCommonType> => state.todoLists;