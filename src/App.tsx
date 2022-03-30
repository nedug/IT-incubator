import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export enum SortedTask {
    all = 'all',
    active = 'active',
    completed = 'completed',
}

type todoListType = {
    id: string
    title: string
    filter: SortedTask
}


const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);

    // const [filteredTask, setTFilteredTask] = useState(SortedTask.all);


    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const addNewTask = (valueInput: string) => {
        const newTask = {id: v1(), title: valueInput, isDone: false};
        setTasks([newTask, ...tasks]);
        // setTFilteredTask(SortedTask.active);
    }

    const filterTask = (filter: SortedTask, id: string) => {
        setTodoListAll(todoListAll.map(tl => tl.id === id ? {...tl, filter} : tl));
    }

    const changeStatusTask = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t));
    };


    // let taskForTodolist = tasks;
    // if (filteredTask === 'active') {
    //     taskForTodolist = tasks.filter(task => task.isDone === false);
    // }
    // if (filteredTask === 'completed') {
    //     taskForTodolist = tasks.filter(task => task.isDone === true);
    // }

    const [todoListAll, setTodoListAll] = useState<Array<todoListType>>([
        {id: v1(), title: 'What to learn', filter: SortedTask.active},
        {id: v1(), title: 'What to buy', filter: SortedTask.completed},
    ]);

    return (
        <div className="App">
            {todoListAll.map(tl => {
                let taskForTodolist = tasks;

                if (tl.filter === 'active') {
                    taskForTodolist = tasks.filter(task => task.isDone === false);
                }
                if (tl.filter === 'completed') {
                    taskForTodolist = tasks.filter(task => task.isDone === true);
                }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        filteredTask={tl.filter}
                        removeTask={removeTask}
                        filterTask={filterTask}
                        addNewTask={addNewTask}
                        changeStatusTask={changeStatusTask}
                    />
                }
            )}
        </div>
    )
};

export default App;