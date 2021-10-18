import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export function App() {

    const [task, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    // BLL - business logic layer:
    // let task_1: Array<TaskType> = [
    //     {id: 1, title: "HTML", isDone: true},
    //     {id: 2, title: "CSS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Redux", isDone: false},
    // ];

    const removeTask = (taskId: number) => {
        setTasks(task.filter(t => t.id !== taskId))
        console.log(task)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // const task_2: Array<TaskType> = [
    //     {id: 1, title: "Bread", isDone: true},
    //     {id: 2, title: "tomato", isDone: false},
    //     {id: 3, title: "potatoes", isDone: true},
    // ];
    // const task_3: Array<TaskType> = [
    //     {id: 1, title: "HTML book", isDone: true},
    //     {id: 2, title: "CSS book", isDone: true},
    //     {id: 3, title: "React site", isDone: false},
    // ];

    // UI:

    let tasksForRender = task;

    if (filter === "active") {
        tasksForRender = task.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = task.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<TodoList title={"What to buy"} tasks={task_2}/>*/}
            {/*<TodoList title={"What to read"} tasks={task_3}/>*/}
        </div>
    );
}