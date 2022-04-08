import {v1} from 'uuid';
import {SortedTask, TodoListAllStateType} from '../App';
import {changeFilterTodolistAC, changeTitleTodolistAC, newTodolistAC, removeTodolistAC, todoListReducer} from "./todoListReducer";


test('correct todolist should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

    const endState = todoListReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist";

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

    const endState = todoListReducer(startState, newTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist";

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

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
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newFilter: SortedTask = SortedTask.completed;

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

    /*const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };*/

    const endState = todoListReducer(startState, changeFilterTodolistAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe(SortedTask.all);
    expect(endState[1].filter).toBe(newFilter);
});



