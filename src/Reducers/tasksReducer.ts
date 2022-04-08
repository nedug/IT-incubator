import {SortedTask, TasksStateType, TodoListAllStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType} from "./todoListReducer";


export const tasksReducer = (state: TasksStateType, action: tasksReducerType): TasksStateType => {
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




        default:
            return state;
    }
};

type tasksReducerType = removeTaskACType | addTaskACType | changeStatusTaskACType | changeTitleTaskACType | AddTodolistActionType

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

// type addNewTodolistACType = ReturnType<typeof addNewTodolistAC>
//
// export const addNewTodolistAC = (titleTodolist: string) => {
//     return {
//         type: 'ADD-NEW-TODOLIST',
//         payload: {titleTodolist}
//     } as const
// };
