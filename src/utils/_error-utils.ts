import { RequestStatus, setErrorAC, setStatusAC } from '../State/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from '../API/API';
import { AxiosError } from 'axios';

/* Ошибки приложения */
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC({ error: data.messages[0] }))
    } else {
        dispatch(setErrorAC({ error: 'Some error occurred' }))
    }
    dispatch(setStatusAC({ status: RequestStatus.failed }))
}

/* Ошибки сети */
export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch) => {
    dispatch(setErrorAC({ error: error.message }))
    dispatch(setStatusAC({ status: RequestStatus.failed }))
}