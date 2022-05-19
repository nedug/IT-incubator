import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {addNewTaskAC, changeStatusTaskAC, removeTaskAC, TasksReducer} from "./reducers/tasksReducer";
import {changeFilterAC, filterReducer} from "./reducers/filterReducer";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    /*let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);*/

    let [tasks, tasksDispatch] = useReducer(TasksReducer, [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);


    function removeTask(id: string) {

        tasksDispatch(removeTaskAC(id));

        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }

    function addTask(title: string) {

        const newTaskID = v1();
        tasksDispatch(addNewTaskAC(title, newTaskID));

        // let task = {id: newTaskID, title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    const changeStatusTask = (taskID: string, isDone: boolean) => {

        tasksDispatch(changeStatusTaskAC(taskID, isDone));

        // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t));
    };


    let [filter, filterDispatch] = useReducer(filterReducer, "all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {

        filterDispatch(changeFilterAC(value));

        // setFilter(value);
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatusTask={changeStatusTask}
            />
        </div>
    );
}

export default App;
