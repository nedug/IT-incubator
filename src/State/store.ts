import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListReducer} from "./todoListReducer";
import {composeWithDevTools} from "redux-devtools-extension";


export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
});


export const store = createStore(rootReducer, composeWithDevTools());


// @ts-ignore
window.store = store;

const x = () => {

}