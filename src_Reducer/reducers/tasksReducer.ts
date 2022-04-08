import {TaskType} from "../Todolist";

/* Reducer - функция принимает 'state' и 'action' и возвращает измененный 'state' */
export const TasksReducer = (state: Array<TaskType>, action: TasksReducerType): Array<TaskType> => {

    switch (action.type) {
        case "REMOVE-TASK":
            return state.filter(t => t.id !== action.payload.id);

        case "ADD-NEW-TASK": {
            const newTask = {id: action.payload.newTaskID, title: action.payload.title, isDone: false};
            return [newTask, ...state];
        }

        case "CHANGE-STATUS-TASK":
            return state.map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t);

        default:
            return state;
    }
};


/* Обшая типизация всех 'action' для Reducer */
type TasksReducerType = removeTaskACType | addNewTaskACType | changeStatusTaskACType


/* Action Creator - создает 'action', которые принимает 'Dispatch()'.
Таких функций столько сколько у нас необходимо функций для работы со состонием */

/* Типизируем RETURN функции. Мы использовали служебный тип 'ReturnType' чтобы получить возвращаемый тип функции. */
type removeTaskACType = ReturnType<typeof removeTaskAC>  /* => {title: 'Remove-Tasks', payload: {id}} */

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',  /* Обязательное поле для Reducer */
        payload: {id},
    } as const
    /* Возвращаемый ОБЪЕКТ как неизменяемую КОНСТАНТУ, все поля объекта становятся 'readonly'.
       Конструкция 'as const' - когда некую сущность нужно сделать иммутабельной. */
}


type addNewTaskACType = ReturnType<typeof addNewTaskAC>

export const addNewTaskAC = (title: string, newTaskID: string) => {
    return {
        type: 'ADD-NEW-TASK',
        payload: {title, newTaskID},
    } as const
}


type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>

export const changeStatusTaskAC = (taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {taskID, isDone},
    } as const
}