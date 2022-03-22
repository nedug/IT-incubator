import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterTask = 'all' | 'active' |'completed'

const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},
    ]);

    const [filteredTask, setTFilteredTask] = useState<FilterTask>('all');


    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const filterTask = (filter: FilterTask) => {
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
            />
        </div>
    )
};


export default App;