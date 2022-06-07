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
    payload: { todolist: TodolistType }
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
                ...action.payload.todolist,
                filter: SortedTask.all,
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

/* Action Creators */
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'TODOLIST/REMOVE-TODOLIST',
        payload: {todolistId,},
    }
};

export const addNewTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: 'TODOLIST/ADD-NEW-TODOLIST',
        payload: {todolist},
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

/* Thunk Creators */
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        API.getTodolists()
            .then(({data}) => dispatch(setTodolistsAC(data)))
    }
};

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        API.deleteTodolist(todolistId)
            .then(() => dispatch(removeTodolistAC(todolistId)))
    }
};

export const addNewTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        API.createTodolist(title)
            .then(({data: {data: {item}}}) => dispatch(addNewTodolistAC(item)))
    }
};

export const changeTitleTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        API.updateTodolist(todolistId, title)
            .then(() => dispatch(changeTitleTodolistAC(todolistId, title)))
    }
};


/* get Todolists from State */
export const selectTodoLists = (state: AppRootStateType): Array<TodoListCommonType> => state.todoLists;