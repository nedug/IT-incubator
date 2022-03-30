import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export enum SortedTask {
    all = 'all',
    active = 'active',
    completed = 'completed',
}

type todoListAllType = {
    id: string
    title: string
    filter: SortedTask
}


const App = () => {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoListAll, setTodoListAll] = useState<Array<todoListAllType>>([
        {id: todoListID1, title: 'What to learn', filter: SortedTask.all},
        {id: todoListID2, title: 'What to buy', filter: SortedTask.completed},
    ]);

    const [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ],
    });

    /*const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);*/

    // const [filteredTask, setTFilteredTask] = useState(SortedTask.all);

    const removeTask = (TaskID: string, TodoListID: string) => {

        tasks[TodoListID] = tasks[TodoListID].filter(task => task.id !== TaskID);
        setTasks({...tasks});

        // const newTasks = {...tasks};
        // newTasks[TodoListID] = newTasks[TodoListID].filter(task => task.id !== TaskID);
        // setTasks(newTasks);
    };

    const addNewTask = (valueInput: string, TodoListID: string) => {

        const newTask = {id: v1(), title: valueInput, isDone: false};
        tasks[TodoListID] = [newTask, ...tasks[TodoListID]];
        setTasks({...tasks});

        filterTask(SortedTask.active, TodoListID);
    };

    const filterTask = (filter: SortedTask, TodoListID: string) => {

        setTodoListAll(todoListAll.map(tl => tl.id === TodoListID ? {...tl, filter} : tl));
    };

    const changeStatusTask = (taskID: string, isDone: boolean, TodoListID: string) => {

        tasks[TodoListID] = tasks[TodoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t);
        setTasks({...tasks});
    };

    const removeTodolist = (TodoListID: string) => {

        setTodoListAll(todoListAll.filter(tl => tl.id !== TodoListID));

        delete tasks[TodoListID];
        setTasks({...tasks});
    };


    return (
        <div className="App">
            {todoListAll.map(tl => {

                    const getFilteredTaskForRender = () => {

                        switch (tl.filter) {
                            case SortedTask.active:
                                return tasks[tl.id].filter(task => !task.isDone);
                            case SortedTask.completed:
                                return tasks[tl.id].filter(task => task.isDone);
                            default:
                                return tasks[tl.id];
                        }
                    };

                    // let taskForTodolist = tasks[tl.id];
                    //
                    // if (tl.filter === SortedTask.active) {
                    //     taskForTodolist = taskForTodolist.filter(task => task.isDone === false);
                    // }
                    // if (tl.filter === SortedTask.completed) {
                    //     taskForTodolist = taskForTodolist.filter(task => task.isDone === true);
                    // }

                    return <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getFilteredTaskForRender()}
                        filteredTask={tl.filter}
                        removeTask={removeTask}
                        filterTask={filterTask}
                        addNewTask={addNewTask}
                        changeStatusTask={changeStatusTask}
                        removeTodolist={removeTodolist}
                    />
                }
            )}
        </div>
    )
};

export default App;