import {SortedTask, TodoListAllStateType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {todolistId: string}
}
export type AddTodolistActionType = {
    type: 'ADD-NEW-TODOLIST'
    payload: {newTodolistTitle: string, todolistId: string}
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: SortedTask
}

type todoListReducerType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todoListReducer = (state: Array<TodoListAllStateType>, action: todoListReducerType): Array<TodoListAllStateType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }

        case 'ADD-NEW-TODOLIST': {
            const newTodolist: TodoListAllStateType = {
                id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: SortedTask.all
            };
            return [...state, newTodolist]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }

        default:
            throw new Error("I don't understand this type")
    }
};


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: {todolistId}}
};

export const addNewTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type: 'ADD-NEW-TODOLIST', payload: {newTodolistTitle, todolistId: v1()}}
};

export const changeTitleTodolistAC = (id: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: newTodolistTitle, id}
};

export const changeFilterTodolistAC = (id: string, filter: SortedTask): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id}
};
