import { Dispatch } from 'redux';
import { authAPI } from '../API/API';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { setIsLoggedInAC } from './auth-reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum RequestStatus {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed',
}


const initialState: initialStateType = {
    status: RequestStatus.idle,
    error: null,
    isInitialized: false,
};

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) { /* Типизиурем Action как PayloadAction */
            state.status = action.payload.status;
        },
        setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        },
    },
});

// Создаем Reducer с помощью slice
export const appReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setStatusAC, setErrorAC, setIsInitializedAC } = slice.actions;

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({ status: RequestStatus.loading }));
    authAPI.me()
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
        .finally(() => {
            dispatch(setIsInitializedAC({ isInitialized: true }));
        })
};


// types
type initialStateType = {
    status: RequestStatus
    error: null | string
    isInitialized: boolean
}