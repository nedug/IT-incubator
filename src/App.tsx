import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

const task1: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: false},
    {id: 3, title: 'React', isDone: true},
];

const task2: Array<TaskType> = [
    {id: 1, title: '11', isDone: false},
    {id: 2, title: '44', isDone: false},
    {id: 3, title: '55', isDone: true},
];

const App = () => (
    <div className="App">

        <TodoList
            title={'What to learn'}
            tasks={task1} />

    </div>
);


export default App;