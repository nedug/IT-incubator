import { Dispatch } from 'redux'
import { RequestStatus, setStatusAC } from './app-reducer'
import { authAPI, LoginParamsType } from '../API/API';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { clearTodosDataAC } from './todolist-reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkType } from './store';


const initialState: initialStateType = {
    isLoggedIn: false,
};

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) { /* Типизиурем Action как PayloadAction */
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

// Создаем Reducer с помощью slice
export const authReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setIsLoggedInAC } = slice.actions;

// thunks
export const loginTC = (loginData: LoginParamsType): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({ status: RequestStatus.loading }));
        const { data } = await authAPI.login(loginData);
        if (data.resultCode === 0) {
            dispatch(setIsLoggedInAC({ isLoggedIn: true }));
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
        } else {
            handleServerAppError(data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
};
export const logoutTC = (): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({ status: RequestStatus.loading }));
        const { data } = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setIsLoggedInAC({ isLoggedIn: false }));
            dispatch(clearTodosDataAC());
            dispatch(setStatusAC({ status: RequestStatus.succeeded }));
        } else {
            handleServerAppError(data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
};


// types
type initialStateType = {
    isLoggedIn: boolean
}
