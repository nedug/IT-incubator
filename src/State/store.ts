import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from './tasks-Reducer';
import {todoListReducer} from './todolist-Reducer';
import thunk from 'redux-thunk';
// import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk),/* composeWithDevTools()*/);


// @ts-ignore
window.store = store;