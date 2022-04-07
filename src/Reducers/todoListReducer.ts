import {SortedTask, TodoListAllStateType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: string
}

type todoListReducerType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todoListReducer = (state: Array<TodoListAllStateType>, action: todoListReducerType) => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            const newTodolist: TodoListAllStateType = {
                id: v1(), title: action.title, filter: SortedTask.all
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
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const newTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: newTodolistTitle}
}

export const ChangeTitleTodolistAC = (id: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: newTodolistTitle, id}
}

export const ChangeFilterTodolistAC = (id: string, filter: SortedTask): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id}
}
