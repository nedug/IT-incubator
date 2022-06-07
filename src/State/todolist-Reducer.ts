import { AppRootStateType } from './store';
import { API, TodolistType } from '../API/API';
import { Dispatch } from 'redux';


const initialState: Array<TodoListCommonType> = [];
/* [{id: todoListID1, title: 'What to learn', filter: SortedTask.all, addedDate: '', order: 0},
{id: todoListID2, title: 'What to buy', filter: SortedTask.completed, addedDate: '', order: 0}, ]*/

export const todoListReducer = (state = initialState, action: ActionsTodoListType): Array<TodoListCommonType> => {
    switch (action.type) {
        case 'TODOLIST/REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId);
        case 'TODOLIST/ADD-NEW-TODOLIST':
            return [{ ...action.payload.todolist, filter: SortedTask.all }, ...state];
        case 'TODOLIST/CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTodolistTitle } : tl);
        case 'TODOLIST/CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl);
        case 'TODOLIST/SET-TODOLISTS':
            return action.payload.todolists.map(tl => ({ ...tl, filter: SortedTask.all }));
        default:
            return state;
    }
};


/* Action Creators */
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'TODOLIST/REMOVE-TODOLIST',
        payload: { todolistId },
    } as const
};
export const addNewTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'TODOLIST/ADD-NEW-TODOLIST',
        payload: { todolist },
    } as const
};
export const changeTitleTodolistAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'TODOLIST/CHANGE-TODOLIST-TITLE',
        payload: { newTodolistTitle, todolistId },
    } as const
};
export const changeFilterTodolistAC = (todolistId: string, filter: SortedTask) => {
    return {
        type: 'TODOLIST/CHANGE-TODOLIST-FILTER',
        payload: { todolistId, filter },
    } as const
};
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'TODOLIST/SET-TODOLISTS',
        payload: { todolists },
    } as const
};


/* Thunk Creators */
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    API.getTodolists()
        .then(({ data }) => dispatch(setTodolistsAC(data)))
};
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    API.deleteTodolist(todolistId)
        .then(() => dispatch(removeTodolistAC(todolistId)))
};
export const addNewTodolistTC = (title: string) => (dispatch: Dispatch) => {
    API.createTodolist(title)
        .then(({ data: { data: { item } } }) => dispatch(addNewTodolistAC(item)))
};
export const changeTitleTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    API.updateTodolist(todolistId, title)
        .then(() => dispatch(changeTitleTodolistAC(todolistId, title)))
};


/* get Todolists from State */
export const selectTodoLists = (state: AppRootStateType): Array<TodoListCommonType> => state.todoLists;


// types
export enum SortedTask {
    all = 'All',
    active = 'Active',
    completed = 'Completed',
}

export type TodoListCommonType = TodolistType & { filter: SortedTask }

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addNewTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTitleTodolistAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeFilterTodolistAC>

type ActionsTodoListType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType