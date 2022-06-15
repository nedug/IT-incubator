import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todoListReducer } from './todolist-reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { appReducer } from './app-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// types
export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;