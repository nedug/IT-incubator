import {TodoListAllStateType} from "../App";
import {v1} from "uuid";
import {todoListID1, todoListID2} from "./tasksReducer";
import {AppRootStateType} from "./store";


export enum SortedTask {
    all = 'All',
    active = 'Active',
    completed = 'Completed',
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: { todolistId: string }
}
export type AddTodolistActionType = {
    type: 'ADD-NEW-TODOLIST'
    payload: { newTodolistTitle: string, todolistId: string }
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: { newTodolistTitle: string, todolistId: string }
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: { filter: SortedTask, todolistId: string }
}

type todoListReducerType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


const initialState: Array<TodoListAllStateType> = [
    {id: todoListID1, title: 'What to learn', filter: SortedTask.all},
    {id: todoListID2, title: 'What to buy', filter: SortedTask.completed},
];

export const todoListReducer = (state: Array<TodoListAllStateType> = initialState, action: todoListReducerType): Array<TodoListAllStateType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }

        case 'ADD-NEW-TODOLIST': {
            const newTodolist: TodoListAllStateType = {
                id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: SortedTask.all
            };
            return [newTodolist, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTodolistTitle} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }

        default:
            return state;
    }
};


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId,},
    }
};

export const addNewTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
        type: 'ADD-NEW-TODOLIST',
        payload: {newTodolistTitle, todolistId: v1(),},
    }
};

export const changeTitleTodolistAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {newTodolistTitle, todolistId,},
    }
};

export const changeFilterTodolistAC = (todolistId: string, filter: SortedTask): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId, filter,},
    }
};


export const selectTodoLists = (state: AppRootStateType): Array<TodoListAllStateType> => state.todoLists;