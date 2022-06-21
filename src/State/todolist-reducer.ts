import { API, TodolistType } from '../API/API';
import { Dispatch } from 'redux';
import { RequestStatus, setStatusAC } from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkType } from './store';


const initialState: Array<TodoListCommonType> = [];
/* [{id: todoListID1, title: 'What to learn', filter: SortedTask.all, addedDate: '', order: 0},
{id: todoListID2, title: 'What to buy', filter: SortedTask.completed, addedDate: '', order: 0}, ]*/

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) { /* Типизиурем Action как PayloadAction */
            return action.payload.todolists.map(tl => ({ ...tl, filter: SortedTask.all, entityStatus: RequestStatus.idle }));
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state.splice(index, 1);
        },
        addNewTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({ ...action.payload.todolist, filter: SortedTask.all, entityStatus: RequestStatus.idle });
        },
        changeTitleTodolistAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        },
        changeFilterTodolistAC(state, action: PayloadAction<{ todolistId: string, filter: SortedTask }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].filter = action.payload.filter;
        },
        changeEntityStatusTodolistAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatus }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].entityStatus = action.payload.entityStatus;
        },
        clearTodosDataAC() {
            return [];
        },
    },
});

// Создаем Reducer с помощью slice
export const todoListReducer = slice.reducer;

// Создаем Actions с помощью slice
export const {
    setTodolistsAC, removeTodolistAC, addNewTodolistAC, changeTitleTodolistAC,
    changeFilterTodolistAC, changeEntityStatusTodolistAC, clearTodosDataAC
} = slice.actions;

/* Thunk Creators */
export const fetchTodolistsTC = (): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({ status: RequestStatus.loading }));
        const { data } = await API.getTodolists();
        dispatch(setTodolistsAC({ todolists: data }));
        dispatch(setStatusAC({ status: RequestStatus.succeeded }));
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
};
export const removeTodolistTC = (todolistId: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(changeEntityStatusTodolistAC({ todolistId, entityStatus: RequestStatus.loading }));
        dispatch(setStatusAC({ status: RequestStatus.loading }));
        const { data } = await API.deleteTodolist(todolistId);

        if (data.resultCode === 0) {
            dispatch(removeTodolistAC({ todolistId }));
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
        } else {
            handleServerAppError(data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
};
export const addNewTodolistTC = (title: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({ status: RequestStatus.loading }));
        const { data } = await API.createTodolist(title);
        if (data.resultCode === 0) {
            dispatch(addNewTodolistAC({ todolist: data.data.item }));
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
        } else {
            handleServerAppError(data, dispatch);
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch);
    }
};
export const changeTitleTodolistTC = (todolistId: string, title: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({ status: RequestStatus.loading }));
        const { data } = await API.updateTodolist(todolistId, title);
        if (data.resultCode === 0) {
            dispatch(changeTitleTodolistAC({ todolistId, title }));
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
        } else {
            handleServerAppError(data, dispatch);
        }
    } catch
        (error: any) {
        handleServerNetworkError(error, dispatch);
    }
};


// types
export enum SortedTask {
    all = 'All',
    active = 'Active',
    completed = 'Completed',
}

export type TodoListCommonType = TodolistType
    & { filter: SortedTask, entityStatus: RequestStatus }