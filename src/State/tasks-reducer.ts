import { addNewTodolistAC, removeTodolistAC, setTodolistsAC } from './todolist-reducer';
import { API, TasksPriority, TasksStatus, TaskType, UpdateTaskModelType } from '../API/API';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';
import { RequestStatus, setStatusAC } from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


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

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
            const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.id);
            state[action.payload.todolistId].splice(index, 1);
        },
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
    },
});

// Создаем Reducer с помощью slice
export const tasksReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setTasksAC, removeTaskAC, addTaskAC, updateTaskAC } = slice.actions;

// Thunk Creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: RequestStatus.loading }));
    API.getTasks(todolistId)
        .then(({ data: { items } }) => {
            dispatch(setTasksAC({ todolistId, tasks: items }));
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: RequestStatus.loading }));
    API.deleteTask(todolistId, id)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(removeTaskAC({ todolistId, id }));
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const addNewTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: RequestStatus.loading }));
    API.createTask(todolistId, title)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(addTaskAC({ task: data.data.item }));
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const updateTaskTC = (todolistId: string, id: string, taskSpecial: SpecialUpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

        API.updateTask(todolistId, id, updateTaskModel)
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    dispatch(updateTaskAC({ todolistId, id, updateTask: taskSpecial }));
                    dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                } else {
                    handleServerAppError(data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
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