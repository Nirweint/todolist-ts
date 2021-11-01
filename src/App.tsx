import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export function App() {

    // BLL - business logic layer:
    const tasksForState: Array<TaskType> = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ];

    const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const updatedTask = tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(updatedTask)
    }
    // const changeTaskStatus = (taskId: string) => {
    //     const updatedTasks = tasks.map(t => {
    //         if (t.id === taskId) {
    //             return {...t, isDone: !t.isDone}
    //         }
    //         return t
    //     })
    //     setTasks(updatedTasks)
    // }

    // const changeTaskStatus = (taskId: string, isDone: boolean) => {
    //     const updatedTasks = tasks.map(t => {
    //         if (t.id === taskId) {
    //             return {...t, isDone: isDone}
    //         }
    //         return t
    //     })
    //     setTasks(updatedTasks)
    // }



    // UI:
    let tasksForRender: Array<TaskType> = tasks;
    if (filter === "active") {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}