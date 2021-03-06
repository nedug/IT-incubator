import { addNewTasksTC, removeTaskTC, tasksReducer, TasksStateType, updateTaskTC } from '../State/tasks-reducer';
import { TasksPriority, TasksStatus } from '../API/API';
import { addNewTodolistTC, removeTodolistTC } from '../State/todolist-reducer';


let startState: TasksStateType = {};

beforeEach(() => {
    startState = {
        'todoListID1': [
            {
                id: '1', title: 'HTML&CSS', status: TasksStatus.Completed,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'todoListID1',
            },
            {
                id: '2', title: 'JS', status: TasksStatus.Completed,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'todoListID1',
            },
            {
                id: '3', title: 'React', status: TasksStatus.New,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'todoListID1',
            },
        ],
        'todoListID2': [
            {
                id: '1', title: 'Milk', status: TasksStatus.Completed,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'todoListID2',
            },
            {
                id: '2', title: 'Book', status: TasksStatus.New,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'todoListID2',
            },
            {
                id: '3', title: 'Tea', status: TasksStatus.New,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'todoListID2',
            },
        ],
    }
})


test('correct task should be removed from correct array', () => {

    const endState = tasksReducer(startState,
        removeTaskTC.fulfilled({ todolistId: 'todoListID2', id: '2' }, 'requestId', { todoListId: 'todoListID2', id: '2' },
        ));

    expect(endState['todoListID1'].length).toBe(3);
    expect(endState['todoListID2'].length).toBe(2);
    expect(endState['todoListID2'].every(t => t.id !== '2')).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addNewTasksTC.fulfilled({
            task: {
                id: '1', title: 'Coffee', status: TasksStatus.Completed,
                description: '', deadline: '', startDate: '', addedDate: '',
                priority: TasksPriority.Low, order: 0, todoListId: 'todoListID2'
            }
        },
        'requestId',
        {
            todolistId: 'todoListID2', title: 'Tea'
        },
    ));

    expect(endState['todoListID1'].length).toBe(3);
    expect(endState['todoListID2'].length).toBe(4);
    expect(endState['todoListID2'][0].title).toBe('Coffee');
    expect(endState['todoListID2'][0].status).toBeTruthy();
    expect(endState['todoListID2'][0].id).toBeDefined();
});


test('status of task should be changed', () => {

    const endState = tasksReducer(startState,
        updateTaskTC.fulfilled({
                todolistId: 'todoListID2', id: '2', taskSpecial: { status: TasksStatus.Completed },
            },
            'requestId',
            { todolistId: 'todoListID2', id: 'xxx', taskSpecial: { status: TasksStatus.Completed } }
        ));

    expect(endState['todoListID2'][1].status).toBeTruthy();
    expect(endState['todoListID1'][1].status).toBeTruthy();
});


test('title of task should be changed', () => {

    const endState = tasksReducer(startState,
        updateTaskTC.fulfilled({
                todolistId: 'todoListID2', id: '2', taskSpecial: { title: 'Table' },
            },
            'requestId',
            { todolistId: 'todoListID2', id: 'xxx', taskSpecial: { title: 'Table' } }));

    expect(endState['todoListID2'][1].title).toBe('Table');
    expect(endState['todoListID1'][1].title).toBe('JS');
});


test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addNewTodolistTC.fulfilled({
            todolist: {
                id: 'sfsf dgfd',
                title: 'New Todolist',
                addedDate: '',
                order: 0,
            },
        }, 'requestId', 'ddddd',
    ));

    const endStateKeys = Object.keys(endState);

    const newTodolistId = endStateKeys.find(k => k !== 'todoListID1' && k !== 'todoListID2');
    if (!newTodolistId) throw Error('new key should be added');

    expect(endStateKeys.length).toBe(3);
    expect(endState[newTodolistId]).toEqual([]);
});


test('property with todolist should be removed', () => {

    const endState = tasksReducer(startState, removeTodolistTC.fulfilled(
        { todolistId: 'todoListID2' }, 'requestId', 'bbfbf'
    ));

    const endStateKeys = Object.keys(endState);

    expect(endStateKeys.length).toBe(1);
    expect(endStateKeys[0]).toBe('todoListID1');

    expect(endState['todoListID2']).toBe(undefined); /* ???????? ?? ???????? ???????????? ???????????????? */
    expect(endState['todoListID2']).toBeUndefined();
    expect(endState['todoListID2']).not.toBeDefined();
});