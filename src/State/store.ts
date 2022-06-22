import { AnyAction, combineReducers } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todoListReducer } from './todolist-reducer';
import thunk, { ThunkAction } from 'redux-thunk';
import { appReducer } from './app-reducer';
import { authReducer } from './auth-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer,
});

// Redux Toolkit
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// types
export type AppRootStateType = ReturnType<typeof rootReducer> /* for rootReducer */
type RootState = ReturnType<typeof store.getState>  /* for useSelector */
type AppDispatch = typeof store.dispatch /* for useDispatch */
export type ThunkType<ReturnType = void> = ThunkAction<void, RootState, unknown, AnyAction> /* for Thunks */

// @ts-ignore
window.store = store;