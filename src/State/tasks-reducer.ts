import { addNewTodolistAC, clearTodosDataAC, removeTodolistAC, setTodolistsAC } from './todolist-reducer';
import { API, TasksPriority, TasksStatus, TaskType, UpdateTaskModelType } from '../API/API';
import { Dispatch } from 'redux';
import { AppRootStateType, ThunkType } from './store';
import { RequestStatus, setStatusAC } from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: TasksStateType = {};
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

// export const removeTaskTC_ = (todolistId: string, id: string): ThunkType => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setStatusAC({ status: RequestStatus.loading }));
//         const { data } = await API.deleteTask(todolistId, id);
//         if (data.resultCode === 0) {
//             dispatch(removeTaskAC({ todolistId, id }));
//             dispatch(setStatusAC({ status: RequestStatus.succeeded }));
//         } else {
//             handleServerAppError(data, dispatch);
//         }
//     } catch (error: any) {
//         handleServerNetworkError(error, dispatch);
//     }
// };
// export const fetchTasksTC_ = (todolistId: string): ThunkType => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setStatusAC({ status: RequestStatus.loading }));
//         const { data: { items } } = await API.getTasks(todolistId);
//         dispatch(setTasksAC({ todolistId, tasks: items }));
//         dispatch(setStatusAC({ status: RequestStatus.succeeded }));
//     } catch (error: any) {
//         handleServerNetworkError(error, dispatch);
//     }
// };


// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
        //     state[action.payload.todolistId] = action.payload.tasks;
        // },
        // removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
        //     const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.id);
        //     state[action.payload.todolistId].splice(index, 1);
        // },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, id: string, updateTask: SpecialUpdateTaskModelType }>) {
            const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.id);
            state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], ...action.payload.updateTask }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addNewTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
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
    },
});

// Создаем Reducer с помощью slice
export const tasksReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { /*setTasksAC,*//* removeTaskAC,*/ addTaskAC, updateTaskAC } = slice.actions;

/* Thunk Creators */
// export const fetchTasksTC = (todolistId: string): ThunkType => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setStatusAC({ status: RequestStatus.loading }));
//         const { data: { items } } = await API.getTasks(todolistId);
//         dispatch(setTasksAC({ todolistId, tasks: items }));
//         dispatch(setStatusAC({ status: RequestStatus.succeeded }));
//     } catch (error: any) {
//         handleServerNetworkError(error, dispatch);
//     }
// };
// export const removeTaskTC = (todolistId: string, id: string): ThunkType => async (dispatch: Dispatch) => {
//     try {
//         dispatch(setStatusAC({ status: RequestStatus.loading }));
//         const { data } = await API.deleteTask(todolistId, id);
//         if (data.resultCode === 0) {
//             dispatch(removeTaskAC({ todolistId, id }));
//             dispatch(setStatusAC({ status: RequestStatus.succeeded }));
//         } else {
//             handleServerAppError(data, dispatch);
//         }
//     } catch (error: any) {
//         handleServerNetworkError(error, dispatch);
//     }
// };
export const addNewTasksTC = (todolistId: string, title: string): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({ status: RequestStatus.loading }));
        const { data } = await API.createTask(todolistId, title);
        if (data.resultCode === 0) {
            dispatch(addTaskAC({ task: data.data.item }));
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
        } else {
            handleServerAppError(data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
};
export const updateTaskTC = (todolistId: string, id: string, taskSpecial: SpecialUpdateTaskModelType): ThunkType => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));

            const state = getState();
            const task = state.tasks[todolistId].find(t => t.id === id)!;

            const updateTaskModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...taskSpecial,
            };

            const { data } = await API.updateTask(todolistId, id, updateTaskModel);
            if (data.resultCode === 0) {
                dispatch(updateTaskAC({ todolistId, id, updateTask: taskSpecial }));
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            } else {
                handleServerAppError(data, dispatch);
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
        }
    }
};


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