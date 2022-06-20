import { Dispatch } from 'redux'
import { AppActionsType, RequestStatus, setStatusAC } from './app-reducer'
import { authAPI, LoginParamsType } from '../API/API';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { clearTodosDataAC } from './todolist-reducer';

const initialState = {
    isLoggedIn: false,
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value };
        default:
            return state;
    }
};

// actions
export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value } as const);

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(RequestStatus.loading));
    authAPI.login(data)
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setStatusAC(RequestStatus.succeeded));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC(RequestStatus.loading));
    authAPI.logout()
        .then(({ data }) => {
            if (data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false));
                dispatch(clearTodosDataAC());
                dispatch(setStatusAC(RequestStatus.succeeded));
            } else {
                handleServerAppError(data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};


// types
type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType
