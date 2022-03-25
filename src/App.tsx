import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// export type FilterTask = 'all' | 'active' |'completed'

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

    const changeStatusTask = (taskID: string, isDone: boolean) => {
        // let task = tasks.find(t => t.id === taskID); /* Поиск нужной таски чкркз find */
        // if (task) task.isDone = isDone;
        // setTasks([...tasks]);

        let newTasks = tasks.map(t => {
            if (t.id === taskID) t.isDone = isDone;
            return t;
        })
        setTasks(newTasks);
    };


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
                changeStatusTask={changeStatusTask}
            />
        </div>
    )
};


export default App;