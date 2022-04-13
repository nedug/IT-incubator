import {TasksStateType, TodoListAllStateType} from "../App";
import {addNewTodolistAC, todoListReducer} from "./todoListReducer";
import {tasksReducer} from "./tasksReducer";

test('id ( should be equal', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistState: Array<TodoListAllStateType> = [];

    const action = addNewTodolistAC('New TodoList');

    const endSTasksState = tasksReducer(startTasksState, action);
    const endSTodolistState = todoListReducer(startTodolistState, action);

    const taskKey = Object.keys(endSTasksState);

    expect(taskKey[0]).toEqual(action.payload.todolistId);
    expect(endSTodolistState[0].id).toEqual(action.payload.todolistId);
});