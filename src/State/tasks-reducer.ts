import { addNewTodolistTC, clearTodosDataAC, fetchTodolistsTC, removeTodolistTC } from './todolist-reducer';
import { API, TasksPriority, TasksStatus, TaskType, UpdateTaskModelType } from '../API/API';
import { AppRootStateType } from './store';
import { RequestStatus, setStatusAC } from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


/* { [todoListID1]: [
    {
        id: v1(), title: 'HTML&CSS', status: TasksStatus.Completed,
        description: '', deadline: '', startDate: '', addedDate: '',
        priority: TasksPriority.Low, order: 0, todoListId: todoListID1,
    },
    {
        id: v1(), title: 'JS', status: TasksStatus.Completed,
        description: '', deadline: '', startDate: '', addedDate: '',
        priority: TasksPriority.Low, order: 0, todoListId: todoListID1,
    },
],
[todoListID2]: [
    {
        id: v1(), title: 'Milk', status: TasksStatus.Completed,
        description: '', deadline: '', startDate: '', addedDate: '',
        priority: TasksPriority.Low, order: 0, todoListId: todoListID2,
    },
], } */

// createAsyncThunk
export const fetchTasksTC = createAsyncThunk(
    'tasks/fetchTasks',
    async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data: { items } } = await API.getTasks(todolistId);
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            return { todolistId, tasks: items };
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

export const removeTaskTC = createAsyncThunk(
    'tasks/removeTask',
    async (param: { todoListId: string, id: string }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await API.deleteTask(param.todoListId, param.id);
            if (data.resultCode === 0) {
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return { todolistId: param.todoListId, id: param.id };
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

export const addNewTasksTC = createAsyncThunk(
    'tasks/addNewTasks',
    async (param: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await API.createTask(param.todolistId, param.title);
            if (data.resultCode === 0) {
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return { task: data.data.item };
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

export const updateTaskTC = createAsyncThunk(
    'tasks/updateTask',
    async (param: { todolistId: string, id: string, taskSpecial: SpecialUpdateTaskModelType },
           { dispatch, getState, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));

            const state = getState() as AppRootStateType;
            const task = state.tasks[param.todolistId].find(t => t.id === param.id)!;

            const updateTaskModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...param.taskSpecial,
            };

            const { data } = await API.updateTask(param.todolistId, param.id, updateTaskModel);
            if (data.resultCode === 0) {
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return param;
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => state[tl.id] = []);
        });
        builder.addCase(clearTodosDataAC, () => {
            return {};
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.id);
            state[action.payload.todolistId].splice(index, 1);
        });
        builder.addCase(addNewTasksTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.id);
            state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], ...action.payload.taskSpecial }
        });
    },
});

// Создаем Reducer с помощью slice
export const tasksReducer = slice.reducer;


// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type SpecialUpdateTaskModelType = { /* Для возможности менять только нужное свойство */
    title?: string
    description?: string
    status?: TasksStatus
    priority?: TasksPriority
    startDate?: string
    deadline?: string
}