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
}