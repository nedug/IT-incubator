import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todoListReducer";


export const todoListID1 = v1();
export const todoListID2 = v1();

const initialState: TasksStateType = {
    [todoListID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Book', isDone: false},
    ],
};

export const tasksReducer = (state: TasksStateType = initialState, action: tasksReducerType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }

        case 'ADD-NEW-TASK': {
            const newTask = {id: v1(), title: action.payload.titleTask, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }

        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        }

        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.titleTask} : t)
            }
        }

        case 'ADD-NEW-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            const copeTask = {...state};
            delete copeTask[action.payload.todolistId];
            return copeTask;
        }

        default:
            return state;
    }
};

type tasksReducerType = removeTaskACType | addTaskACType | changeStatusTaskACType
    | changeTitleTaskACType | AddTodolistActionType | RemoveTodolistActionType

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    } as const
};

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistId: string, titleTask: string) => {
    return {
        type: 'ADD-NEW-TASK',
        payload: {todolistId, titleTask}
    } as const
};

type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>

export const changeStatusTaskAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {todolistId, taskId, isDone}
    } as const
};

type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>

export const changeTitleTaskAC = (todolistId: string, taskId: string, titleTask: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {todolistId, taskId, titleTask}
    } as const
};
