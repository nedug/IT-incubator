import { RequestStatus, setStatusAC } from './app-reducer'
import { authAPI, LoginParamsType } from '../API/API';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { clearTodosDataAC } from './todolist-reducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


// createAsyncThunk
export const loginTC = createAsyncThunk(
    'auth/login',
    async (loginData: LoginParamsType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await authAPI.login(loginData);
            if (data.resultCode === 0) {
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return { isLoggedIn: true };
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

export const logoutTC = createAsyncThunk(
    'auth/logout',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setStatusAC({ status: RequestStatus.loading }));
            const { data } = await authAPI.logout();
            if (data.resultCode === 0) {
                dispatch(clearTodosDataAC());
                dispatch(setStatusAC({ status: RequestStatus.succeeded }));
                return { isLoggedIn: false };
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue({});
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(error);
        }
    });

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    } as initialStateType,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) { /* Типизиурем Action как PayloadAction */
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        });
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        });
    },
});

// Создаем Reducer с помощью slice
export const authReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setIsLoggedInAC } = slice.actions;


// types
type initialStateType = {
    isLoggedIn: boolean
}
