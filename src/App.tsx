import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export enum SortedTask {
    all = 'all',
    active = 'active',
    completed = 'completed',
}


const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);

    const [filteredTask, setTFilteredTask] = useState(SortedTask.all);


    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const addNewTask = (valueInput: string) => {
        const newTask = {id: v1(), title: valueInput, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    const filterTask = (filter: SortedTask) => {
        setTFilteredTask(filter);
    }


    let taskForTodolist = tasks;
    if (filteredTask === 'active') {
        taskForTodolist = tasks.filter(task => task.isDone === false);
    }
    if (filteredTask === 'completed') {
        taskForTodolist = tasks.filter(task => task.isDone === true);
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={taskForTodolist}
                removeTask={removeTask}
                filterTask={filterTask}
                addNewTask={addNewTask}
            />
        </div>
    )
};


export default App;