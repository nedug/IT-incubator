import { combineReducers } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todoListReducer } from './todolist-reducer';
import thunk from 'redux-thunk';
import { appReducer } from './app-reducer';
import { configureStore } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
});

// Redux
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Redux Toolkit
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})


// types
export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;