import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListReducer} from "./todoListReducer";


export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
});


export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;