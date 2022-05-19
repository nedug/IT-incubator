import {FilterValuesType} from "../App";

export const filterReducer = (state: FilterValuesType, action: changeFilterACType): FilterValuesType => {
    switch (action.type) {
        case "CHANGE-FILTER-TASK":
            return action.payload.value;

        default:
            return state;
    }
};

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TASK',
        payload: {value},
    } as const
}

