import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from './tasks-Reducer';
import {todoListReducer} from './todolist-Reducer';
// import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';


export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
});


export const store = createStore(rootReducer, applyMiddleware(thunk)/*, composeWithDevTools()*/);


// @ts-ignore
window.store = store;