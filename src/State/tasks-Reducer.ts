import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolist-Reducer';
import {TasksPriority, TasksStatus, TaskType} from '../API/API';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const todoListID1 = v1();
export const todoListID2 = v1();


const initialState: TasksStateType = {
    [todoListID1]: [
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
        {
            id: v1(), title: 'React', status: TasksStatus.New,
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
        {
            id: v1(), title: 'Book', status: TasksStatus.New,
            description: '', deadline: '', startDate: '', addedDate: '',
            priority: TasksPriority.Low, order: 0, todoListId: todoListID2,
        },
    ],
};

export const tasksReducer = (state: TasksStateType = initialState, action: tasksReducerType): TasksStateType => {
    switch (action.type) {

        case 'TASK/REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }

        case 'TASK/ADD-NEW-TASK': {
            const newTask = {
                id: v1(), title: action.payload.titleTask, status: TasksStatus.New,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: action.payload.todolistId,
            };
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }

        case 'TASK/CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, status: action.payload.status} : t)
            }
        }

        case 'TASK/CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.titleTask} : t)
            }
        }

        case 'TODOLIST/ADD-NEW-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }

        case 'TODOLIST/REMOVE-TODOLIST': {
            const copyTask = {...state};
            delete copyTask[action.payload.todolistId];
            return copyTask;
        }

        case 'TODOLIST/SET-TODOLISTS': {
            const copyTask = {...state};
            action.payload.todolists.forEach(tl => copyTask[tl.id] = []);
            return copyTask;
        }

        default:
            return state;
    }
};

type tasksReducerType = removeTaskACType | addTaskACType | changeStatusTaskACType
    | changeTitleTaskACType | AddTodolistActionType | RemoveTodolistActionType
    | SetTodolistsActionType

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'TASK/REMOVE-TASK',
        payload: {todolistId, taskId,},
    } as const
};

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistId: string, titleTask: string) => {
    return {
        type: 'TASK/ADD-NEW-TASK',
        payload: {todolistId, titleTask,},
    } as const
};

type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>

export const changeStatusTaskAC = (todolistId: string, taskId: string, status: TasksStatus) => {
    return {
        type: 'TASK/CHANGE-STATUS-TASK',
        payload: {todolistId, taskId, status,},
    } as const
};

type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>

export const changeTitleTaskAC = (todolistId: string, taskId: string, titleTask: string) => {
    return {
        type: 'TASK/CHANGE-TITLE-TASK',
        payload: {todolistId, taskId, titleTask,},
    } as const
};