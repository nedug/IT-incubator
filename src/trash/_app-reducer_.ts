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
// }
//
// export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return { ...state, status: action.status };
//         case 'APP/SET-ERROR':
//             return { ...state, error: action.error };
//         default:
//             return state;
//     }
// }
//
// export const setStatusAC = (status: RequestStatus) => {
//     return {
//         type: 'APP/SET-STATUS',
//         status,
//     } as const
// }
// export const setErrorAC = (error: null | string) => {
//     return {
//         type: 'APP/SET-ERROR',
//         error,
//     } as const
// }
//
//
// // types
// export type initialStateType = {
//     status: RequestStatus
//     error: null | string
// }
//
// type setStatusType = ReturnType<typeof setStatusAC>
// type setErrorType = ReturnType<typeof setErrorAC>
//
// export type ActionsType =
//     | setStatusType
//     | setErrorType

export {}