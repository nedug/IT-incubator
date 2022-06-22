import { v1 } from 'uuid';
import { addNewTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, setTodolistsAC, SortedTask, TodoListCommonType, todoListReducer } from '../State/todolist-reducer';
import { RequestStatus } from '../State/app-reducer';


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListCommonType> = []; /* Изначально пустой массив */

beforeEach(() => { /* Весь этот код будет перезаписываться перед каждым тестом */
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        { id: todolistId1, title: 'What to learn', filter: SortedTask.all, entityStatus: RequestStatus.idle, addedDate: '', order: 0 },
        { id: todolistId2, title: 'What to buy', filter: SortedTask.all, entityStatus: RequestStatus.idle, addedDate: '', order: 0 },
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodolistAC({ todolistId: todolistId1 }));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    const newTodolist = {
        id: 'sfsf dgfd',
        title: 'New Todolist',
        addedDate: '',
        order: 0,
    };

    const endState = todoListReducer(startState, addNewTodolistAC({ todolist: newTodolist }));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolist.title);
});


test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todolist';

    const endState = todoListReducer(startState, changeTitleTodolistAC({ todolistId: todolistId2, title: newTodolistTitle }));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    const newFilter: SortedTask = SortedTask.completed;

    const endState = todoListReducer(startState, changeFilterTodolistAC({ todolistId: todolistId2, filter: newFilter }));

    expect(endState[0].filter).toBe(SortedTask.all);
    expect(endState[1].filter).toBe(newFilter);
});


test('todolists should be set to state', () => {

    const endState = todoListReducer([], setTodolistsAC({ todolists: startState }));

    expect(endState.length).toBe(2);
});