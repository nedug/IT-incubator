// import { Dispatch } from 'redux';
// import { authAPI } from '../API/API';
// import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
// import { setIsLoggedInAC } from './auth-reducer';
//
// export enum RequestStatus {
//     idle = 'idle',
//     loading = 'loading',
//     succeeded = 'succeeded',
//     failed = 'failed',
// }
//
//
// const initialState: initialStateType = {
//     status: RequestStatus.idle,
//     error: null,
//     isInitialized: false,
// }
//
// export const appReducer = (state = initialState, action: AppActionsType): initialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return { ...state, status: action.status };
//         case 'APP/SET-ERROR':
//             return { ...state, error: action.error };
//         case 'APP/SET-IS-INITIALIZED':
//             return { ...state, isInitialized: action.isInitialized };
//         default:
//             return state;
//     }
// }
//
// // actions
// export const setStatusAC = (status: RequestStatus) => {
//     return {
//         type: 'APP/SET-STATUS',
//         status,
//     } as const
// };
// export const setErrorAC = (error: null | string) => {
//     return {
//         type: 'APP/SET-ERROR',
//         error,
//     } as const
// };
// export const setIsInitializedAC = (isInitialized: boolean) => {
//     return {
//         type: 'APP/SET-IS-INITIALIZED',
//         isInitialized,
//     } as const
// };
//
// // thunks
// export const initializeAppTC = () => (dispatch: Dispatch) => {
//     dispatch(setStatusAC(RequestStatus.loading));
//     authAPI.me()
//         .then(({ data }) => {
//             if (data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true));
//                 dispatch(setStatusAC(RequestStatus.succeeded));
//             } else {
//                 handleServerAppError(data, dispatch);
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
//         .finally(() => {
//             dispatch(setIsInitializedAC(true));
//         })
// };
//
//
// // types
// export type initialStateType = {
//     status: RequestStatus
//     error: null | string
//     isInitialized: boolean
// }
//
// type setStatusType = ReturnType<typeof setStatusAC>
// type setErrorType = ReturnType<typeof setErrorAC>
// type setIsInitializedType = ReturnType<typeof setIsInitializedAC>
//
// export type AppActionsType =
//     | setStatusType
//     | setErrorType
//     | setIsInitializedType

export {}