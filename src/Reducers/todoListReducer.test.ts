import {v1} from 'uuid';
import {SortedTask, TodoListAllStateType} from '../App';
import {ChangeFilterTodolistAC, ChangeTitleTodolistAC, newTodolistAC, RemoveTodolistAC, todoListReducer} from "./todoListReducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

    const endState = todoListReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

    const endState = todoListReducer(startState, newTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, ChangeTitleTodolistAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: SortedTask = SortedTask.completed;

    const startState: Array<TodoListAllStateType> = [
        {id: todolistId1, title: "What to learn", filter: SortedTask.all},
        {id: todolistId2, title: "What to buy", filter: SortedTask.all}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, ChangeFilterTodolistAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe(SortedTask.all);
    expect(endState[1].filter).toBe(newFilter);
});



