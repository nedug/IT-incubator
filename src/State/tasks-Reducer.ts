import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolist-Reducer';
import {API, TasksPriority, TasksStatus, TaskType, UpdateTaskModelType} from '../API/API';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const todoListID1 = v1();
export const todoListID2 = v1();


const initialState: TasksStateType = {
    /*[todoListID1]: [
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
    ],*/
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
            const newTask = action.payload.task;
            return {...state, [action.payload.task.todoListId]: [newTask, ...state[action.payload.task.todoListId]]}
        }

        case 'TASK/UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.updateTask} : t)
            }
        }

        case 'TODOLIST/ADD-NEW-TODOLIST': {
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        }

        case 'TODOLIST/REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.payload.todolistId];
            return copyState;
        }

        case 'TODOLIST/SET-TODOLISTS': {
            const copyState = {...state};
            action.payload.todolists.forEach(tl => copyState[tl.id] = []);
            return copyState;
        }

        case 'TASK/SET-TASKS': {
            const copyState = {...state};
            copyState[action.payload.todolistId] = action.payload.tasks;
            return copyState;
        }

        default:
            return state;
    }
};

type tasksReducerType = removeTaskACType | addTaskACType | changeStatusTaskACType
    | AddTodolistActionType | RemoveTodolistActionType
    | SetTodolistsActionType | setTasksACType

/* Action Creators */
type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'TASK/REMOVE-TASK',
        payload: {todolistId, taskId,},
    } as const
};

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'TASK/ADD-NEW-TASK',
        payload: {task,},
    } as const
};

type changeStatusTaskACType = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todolistId: string, taskId: string, updateTask: SpecialUpdateTaskModelType) => {
    return {
        type: 'TASK/UPDATE-TASK',
        payload: {todolistId, taskId, updateTask,},
    } as const
};

type setTasksACType = ReturnType<typeof setTasksAC>

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: 'TASK/SET-TASKS',
        payload: {todolistId, tasks,},
    } as const
};

/* Thunk Creators */
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        API.getTasks(todolistId)
            .then(({data: {items}}) => dispatch(setTasksAC(todolistId, items)))
    }
};

export const removeTaskTC = (todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        API.deleteTask(todolistId, id)
            .then(() => dispatch(removeTaskAC(todolistId, id)))
    }
};

export const addNewTasksTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        API.createTask(todolistId, title)
            .then(({data: {data: {item}}}) => dispatch(addTaskAC(item)))
    }
};


export type SpecialUpdateTaskModelType = { /* Для возможности менять только нужное свойство */
    title?: string
    description?: string
    status?: TasksStatus
    priority?: TasksPriority
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, taskSpecial: SpecialUpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
            .then(() => dispatch(updateTaskAC(todolistId, taskId, taskSpecial)))
    }
};