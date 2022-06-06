import {addNewTodolistAC, TodoListCommonType, todoListReducer} from './todolist-Reducer';
import {tasksReducer, TasksStateType} from './tasks-Reducer';

test('id ( should be equal', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistState: Array<TodoListCommonType> = [];

    const action = addNewTodolistAC('New TodoList');

    const endSTasksState = tasksReducer(startTasksState, action);
    const endSTodolistState = todoListReducer(startTodolistState, action);

    const taskKey = Object.keys(endSTasksState);

    expect(taskKey[0]).toEqual(action.payload.todolistId);
    expect(endSTodolistState[0].id).toEqual(action.payload.todolistId);
});