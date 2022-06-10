import { addNewTodolistAC, TodoListCommonType, todoListReducer } from '../State/todolist-reducer';
import { tasksReducer, TasksStateType } from '../State/tasks-reducer';


test('id ( should be equal', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistState: Array<TodoListCommonType> = [];

    const action = addNewTodolistAC({
            id: 'sfsf dgfd',
            title: 'New Todolist',
            addedDate: '',
            order: 0,
        }
    );

    const endSTasksState = tasksReducer(startTasksState, action);
    const endSTodolistState = todoListReducer(startTodolistState, action);

    const taskKey = Object.keys(endSTasksState);

    expect(taskKey[0]).toEqual(action.payload.todolist.id);
    expect(endSTodolistState[0].id).toEqual(action.payload.todolist.id);
});