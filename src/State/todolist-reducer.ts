import { API, TodolistType } from '../API/API';
import { RequestStatus, setStatusAC } from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


/* [{id: todoListID1, title: 'What to learn', filter: SortedTask.all, addedDate: '', order: 0},
{id: todoListID2, title: 'What to buy', filter: SortedTask.completed, addedDate: '', order: 0}, ]*/

// createAsyncThunk
export const fetchTodolistsTC = createAsyncThunk(
    'todoLists/fetchTodolists',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await API.getTodolists();
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            return { todolists: data };
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

export const removeTodolistTC = createAsyncThunk(
    'todoLists/removeTodolist',
    async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(changeEntityStatusTodolistAC({ todolistId, entityStatus: RequestStatus.loading }));
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await API.deleteTodolist(todolistId);

            if (data.resultCode === 0) {
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return { todolistId };
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

export const addNewTodolistTC = createAsyncThunk(
    'todoLists/addNewTodolist',
    async (title: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await API.createTodolist(title);
            if (data.resultCode === 0) {
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return { todolist: data.data.item };
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch
            (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

export const changeTitleTodolistTC = createAsyncThunk(
    'todoLists/changeTitleTodolist',
    async (param: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await API.updateTodolist(param.todolistId, param.title);
            if (data.resultCode === 0) {
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return { todolistId: param.todolistId, title: param.title };
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch
            (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'todoList',
    initialState: [] as Array<TodoListCommonType>,
    reducers: {
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
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({ ...tl, filter: SortedTask.all, entityStatus: RequestStatus.idle }));
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state.splice(index, 1);
        });
        builder.addCase(addNewTodolistTC.fulfilled, (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: SortedTask.all, entityStatus: RequestStatus.idle });
        });
        builder.addCase(changeTitleTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        });
    },
});

// Создаем Reducer с помощью slice
export const todoListReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { changeFilterTodolistAC, changeEntityStatusTodolistAC, clearTodosDataAC } = slice.actions;


// types
export enum SortedTask {
    all = 'All',
    active = 'Active',
    completed = 'Completed',
}

export type TodoListCommonType = TodolistType
    & { filter: SortedTask, entityStatus: RequestStatus }