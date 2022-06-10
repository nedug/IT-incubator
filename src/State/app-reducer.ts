export enum RequestStatus {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed',
}


const initialState: initialStateType = {
    status: RequestStatus.idle
}

export const appReducer = (state= initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatus) => {
    return {
        type: 'APP/SET-STATUS',
        status,
    } as const
}


// types
type initialStateType = {
    status: RequestStatus
}

type setStatusType = ReturnType<typeof setStatusAC>

type ActionsType =
    | setStatusType