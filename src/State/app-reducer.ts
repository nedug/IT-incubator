import { authAPI } from '../API/API';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { setIsLoggedInAC } from './auth-reducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum RequestStatus {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed',
}

// createAsyncThunk
export const initializeAppTC = createAsyncThunk(
    'app/initializeApp',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await authAPI.me();
            if (data.resultCode === 0) {
                dispatch(setIsLoggedInAC({ isLoggedIn: true }));
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
            } else {
                handleServerAppError(data, dispatch);
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'app',
    initialState: {
        status: RequestStatus.idle,
        error: null,
        isInitialized: false,
    } as initialStateType,
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: RequestStatus }>) { /* Типизиурем Action как PayloadAction */
            state.status = action.payload.status;
        },
        setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
        });
    },
});

// Создаем Reducer с помощью slice
export const appReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setStatusAC, setErrorAC } = slice.actions;


// types
export type initialStateType = {
    status: RequestStatus
    error: null | string
    isInitialized: boolean
}