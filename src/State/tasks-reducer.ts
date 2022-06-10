import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolist-reducer';
import { API, TasksPriority, TasksStatus, TaskType, UpdateTaskModelType } from '../API/API';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';
import { RequestStatus, setStatusAC } from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';


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

export const tasksReducer = (state = initialState, action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case 'TASK/SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks,
            };
        case 'TASK/REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(task => task.id !== action.payload.taskId),
            };
        case 'TASK/ADD-NEW-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
            };
        case 'TASK/UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? { ...t, ...action.payload.updateTask } : t),
            };
        case 'TODOLIST/ADD-NEW-TODOLIST':
            return {
                ...state,
                [action.payload.todolist.id]: [],
            };
        case 'TODOLIST/REMOVE-TODOLIST': {
            const copyState = { ...state };
            delete copyState[action.payload.todolistId];
            return copyState;
        }
        case 'TODOLIST/SET-TODOLISTS': {
            const copyState = { ...state };
            action.payload.todolists.forEach(tl => copyState[tl.id] = []);
            return copyState;
        }
        default:
            return state;
    }
};


/* Action Creators */
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: 'TASK/SET-TASKS',
        payload: { todolistId, tasks },
    } as const
};
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'TASK/REMOVE-TASK',
        payload: { todolistId, taskId },
    } as const
};
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'TASK/ADD-NEW-TASK',
        payload: { task },
    } as const
};
export const updateTaskAC = (todolistId: string, taskId: string, updateTask: SpecialUpdateTaskModelType) => {
    return {
        type: 'TASK/UPDATE-TASK',
        payload: { todolistId, taskId, updateTask },
    } as const
};


/* Thunk Creators */
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(RequestStatus.loading));
    API.getTasks(todolistId)
        .then(({ data: { items } }) => {
            dispatch(setTasksAC(todolistId, items));
            dispatch(setStatusAC(RequestStatus.succeeded));
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(RequestStatus.loading));
    API.deleteTask(todolistId, id)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, id));
                dispatch(setStatusAC(RequestStatus.succeeded));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const addNewTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(RequestStatus.loading));
    API.createTask(todolistId, title)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(addTaskAC(data.data.item));
                dispatch(setStatusAC(RequestStatus.succeeded));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const updateTaskTC = (todolistId: string, taskId: string, taskSpecial: SpecialUpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusAC(RequestStatus.loading));

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)!;

        const updateTaskModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...taskSpecial,
        };

        API.updateTask(todolistId, taskId, updateTaskModel)
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, taskSpecial));
                    dispatch(setStatusAC(RequestStatus.succeeded));
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

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

type ActionsTasksType =
    | removeTaskACType
    | addTaskACType
    | changeStatusTaskACType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | setTasksACType