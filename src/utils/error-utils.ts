import { AppActionsType, RequestStatus, setErrorAC, setStatusAC } from '../State/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from '../API/API';
import { AxiosError } from 'axios';

/* Ошибки приложения */
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC(RequestStatus.failed))
}

/* Ошибки сети */
export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch) => {
    dispatch(setErrorAC(error.message))
    dispatch(setStatusAC(RequestStatus.failed))
}