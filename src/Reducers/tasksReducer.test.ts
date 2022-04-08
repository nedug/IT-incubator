import {TasksStateType} from '../App';
import {addNewTodolistAC, removeTodolistAC} from "./todoListReducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./tasksReducer";


test('correct task should be removed from correct array', () => {

    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Book', isDone: false},
            {id: '3', title: 'Tea', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, removeTaskAC('todoListID2', '2'))

    expect(endState['todoListID1'].length).toBe(3);
    expect(endState['todoListID2'].length).toBe(2);
    expect(endState['todoListID2'].every(t => t.id !== '2')).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Book', isDone: false},
            {id: '3', title: 'Tea', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, addTaskAC('todoListID2', 'Coffee'))

    expect(endState['todoListID1'].length).toBe(3);
    expect(endState['todoListID2'].length).toBe(4);
    expect(endState['todoListID2'][0].title).toBe('Coffee');
    expect(endState['todoListID2'][0].isDone).toBeFalsy();
    expect(endState['todoListID2'][0].id).toBeDefined();
});


test('status of task should be changed', () => {

    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Book', isDone: false},
            {id: '3', title: 'Tea', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, changeStatusTaskAC('todoListID2', '2', true))

    expect(endState['todoListID2'][1].isDone).toBeTruthy();
    expect(endState['todoListID1'][1].isDone).toBeFalsy();
});


test('title of task should be changed', () => {

    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Book', isDone: false},
            {id: '3', title: 'Tea', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, changeTitleTaskAC('todoListID2', '2', 'Table'))

    expect(endState['todoListID2'][1].title).toBe('Table');
    expect(endState['todoListID1'][1].title).toBe('JS');
});


test('new array should be added when new todolist is added', () => {

    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Book', isDone: false},
            {id: '3', title: 'Tea', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, addNewTodolistAC('New TodoList'));

    const endStateKeys = Object.keys(endState);

    const newTodolistId = endStateKeys.find(k => k !== 'todoListID1' && k !== 'todoListID2');

    if (!newTodolistId) throw Error('new key should be added');

    expect(endStateKeys.length).toBe(3);
    expect(endState[newTodolistId]).toEqual([]);
});


test('property with todolist should be removed', () => {

    const startState: TasksStateType = {
        'todoListID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListID2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Book', isDone: false},
            {id: '3', title: 'Tea', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, removeTodolistAC('todoListID2'));

    const endStateKeys = Object.keys(endState);

    expect(endStateKeys.length).toBe(1);
    expect(endStateKeys[0]).toBe('todoListID1');

    expect(endState['todoListID2']).toBe(undefined); /* одно и тоже разным способом */
    expect(endState['todoListID2']).toBeUndefined();
    expect(endState['todoListID2']).not.toBeDefined();
});

