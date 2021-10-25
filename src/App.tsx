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

    const [task, setTasks] = useState<Array<TaskType>>(tasksForState)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string) => {
        setTasks(task.filter(t => t.id !== taskId))
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
        setTasks([newTask, ...task])
    }

    // UI:
    let tasksForRender: Array<TaskType> = task;

    if (filter === "active") {
        tasksForRender = task.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForRender = task.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}