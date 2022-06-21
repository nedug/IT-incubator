import { Dispatch } from 'redux'
import { RequestStatus, setStatusAC } from './app-reducer'
import { authAPI, LoginParamsType } from '../API/API';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { clearTodosDataAC } from './todolist-reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


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
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: RequestStatus.loading }));
    authAPI.login(data)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedInAC({ isLoggedIn: true }));
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: RequestStatus.loading }));
    authAPI.logout()
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedInAC({ isLoggedIn: false }));
                dispatch(clearTodosDataAC());
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};


// types
type initialStateType = {
    isLoggedIn: boolean
}
