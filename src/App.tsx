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

    // BLL - business logic layer:
    let tasksForState: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ];

    const [task, setTasks] = useState<Array<TaskType>>(tasksForState)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: number) => {
        setTasks(task.filter(t => t.id !== taskId))
        console.log(task)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
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
            />
        </div>
    );
}