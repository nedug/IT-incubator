// import { AppRootStateType } from './store';
// import { API, TodolistType } from '../API/API';
// import { Dispatch } from 'redux';
// import { RequestStatus, setStatusAC } from './app-reducer';
// import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
//
//
// const initialState: Array<TodoListCommonType> = [];
// /* [{id: todoListID1, title: 'What to learn', filter: SortedTask.all, addedDate: '', order: 0},
// {id: todoListID2, title: 'What to buy', filter: SortedTask.completed, addedDate: '', order: 0}, ]*/
//
// export const todoListReducer = (state = initialState, action: ActionsTodoListType): Array<TodoListCommonType> => {
//     switch (action.type) {
//         case 'TODOLIST/SET-TODOLISTS':
//             return action.payload.todolists.map(tl => ({ ...tl, filter: SortedTask.all, entityStatus: RequestStatus.idle }));
//         case 'TODOLIST/REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.payload.todolistId);
//         case 'TODOLIST/ADD-NEW-TODOLIST':
//             return [{ ...action.payload.todolist, filter: SortedTask.all, entityStatus: RequestStatus.idle }, ...state];
//         case 'TODOLIST/CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTodolistTitle } : tl);
//         case 'TODOLIST/CHANGE-TODOLIST-FILTER':
//             return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl);
//         case 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS':
//             return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, entityStatus: action.payload.entityStatus } : tl);
//         case 'TODOLIST/CLEAR-DATA':
//             return [];
//         default:
//             return state;
//     }
// };
//
// /* Action Creators */
// export const setTodolistsAC = (todolists: Array<TodolistType>) => {
//     return {
//         type: 'TODOLIST/SET-TODOLISTS',
//         payload: { todolists },
//     } as const
// };
// export const removeTodolistAC = (todolistId: string) => {
//     return {
//         type: 'TODOLIST/REMOVE-TODOLIST',
//         payload: { todolistId },
//     } as const
// };
// export const addNewTodolistAC = (todolist: TodolistType) => {
//     return {
//         type: 'TODOLIST/ADD-NEW-TODOLIST',
//         payload: { todolist },
//     } as const
// };
// export const changeTitleTodolistAC = (todolistId: string, newTodolistTitle: string) => {
//     return {
//         type: 'TODOLIST/CHANGE-TODOLIST-TITLE',
//         payload: { newTodolistTitle, todolistId },
//     } as const
// };
// export const changeFilterTodolistAC = (todolistId: string, filter: SortedTask) => {
//     return {
//         type: 'TODOLIST/CHANGE-TODOLIST-FILTER',
//         payload: { todolistId, filter },
//     } as const
// };
// export const changeEntityStatusTodolistAC = (todolistId: string, entityStatus: RequestStatus) => {
//     return {
//         type: 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS',
//         payload: { todolistId, entityStatus },
//     } as const
// };
// export const clearTodosDataAC = () => {
//     return {
//         type: 'TODOLIST/CLEAR-DATA',
//     } as const
// };
//
// /* Thunk Creators */
// export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
//     dispatch(setStatusAC(RequestStatus.loading));
//     API.getTodolists()
//         .then(({ data }) => {
//             dispatch(setTodolistsAC(data));
//             dispatch(setStatusAC(RequestStatus.succeeded));
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
// };
// export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(changeEntityStatusTodolistAC(todolistId, RequestStatus.loading));
//     dispatch(setStatusAC(RequestStatus.loading));
//     API.deleteTodolist(todolistId)
//         .then(({ data }) => {
//             if (data.resultCode === 0) {
//                 dispatch(removeTodolistAC(todolistId));
//                 dispatch(setStatusAC(RequestStatus.succeeded));
//             } else {
//                 handleServerAppError(data, dispatch);
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
// };
// export const addNewTodolistTC = (title: string) => (dispatch: Dispatch) => {
//     dispatch(setStatusAC(RequestStatus.loading));
//     API.createTodolist(title)
//         .then(({ data }) => {
//             if (data.resultCode === 0) {
//                 dispatch(addNewTodolistAC(data.data.item));
//                 dispatch(setStatusAC(RequestStatus.succeeded));
//             } else {
//                 handleServerAppError(data, dispatch);
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
// };
// export const changeTitleTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
//     dispatch(setStatusAC(RequestStatus.loading));
//     API.updateTodolist(todolistId, title)
//         .then(({ data }) => {
//             if (data.resultCode === 0) {
//                 dispatch(changeTitleTodolistAC(todolistId, title));
//                 dispatch(setStatusAC(RequestStatus.succeeded));
//             } else {
//                 handleServerAppError(data, dispatch);
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
// };
//
// /* get Todolists from State */
// export const selectTodoLists = (state: AppRootStateType): Array<TodoListCommonType> => state.todoLists;
//
//
// // types
// export enum SortedTask {
//     all = 'All',
//     active = 'Active',
//     completed = 'Completed',
// }
//
// export type TodoListCommonType = TodolistType
//     & { filter: SortedTask, entityStatus: RequestStatus }
//
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type AddTodolistActionType = ReturnType<typeof addNewTodolistAC>
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
// type ChangeTodolistTitleActionType = ReturnType<typeof changeTitleTodolistAC>
// type ChangeTodolistFilterActionType = ReturnType<typeof changeFilterTodolistAC>
// type ChangeEntityStatusTodolistActionType = ReturnType<typeof changeEntityStatusTodolistAC>
// export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>
//
// type ActionsTodoListType =
//     | RemoveTodolistActionType
//     | AddTodolistActionType
//     | ChangeTodolistTitleActionType
//     | ChangeTodolistFilterActionType
//     | SetTodolistsActionType
//     | ChangeEntityStatusTodolistActionType
//     | ClearTodosDataActionType

export {}