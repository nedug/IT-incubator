import {v1} from 'uuid';
import {changeFilterTodolistAC, changeTitleTodolistAC, addNewTodolistAC, removeTodolistAC, todoListReducer, SortedTask, TodoListCommonType} from './todolist-Reducer';


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListCommonType> = []; /* Изначально пустой массив */

beforeEach(() => { /* Весь этот код будет перезаписываться перед каждым тестом */
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all, addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all, addedDate: '', order: 0},
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    const newTodolistTitle = "New Todolist";

    const endState = todoListReducer(startState, addNewTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {

    const newTodolistTitle = "New Todolist";

    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };*/

    const endState = todoListReducer(startState, changeTitleTodolistAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    const newFilter: SortedTask = SortedTask.completed;

    /*const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };*/

    const endState = todoListReducer(startState, changeFilterTodolistAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe(SortedTask.all);
    expect(endState[1].filter).toBe(newFilter);
});



