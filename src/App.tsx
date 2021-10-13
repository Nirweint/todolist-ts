import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function App() {

    const task_1: Array<TaskType> = [ // TaskType []
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ];
    const task_2: Array<TaskType> = [
        {id: 1, title: "Bread", isDone: true},
        {id: 2, title: "tomato", isDone: false},
        {id: 3, title: "potatoes", isDone: true},
    ];
    const task_3: Array<TaskType> = [
        {id: 1, title: "HTML book", isDone: true},
        {id: 2, title: "CSS book", isDone: true},
        {id: 3, title: "React site", isDone: false},
    ];


    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={task_1}/>
            <TodoList title={"What to buy"} tasks={task_2}/>
            <TodoList title={"What to read"} tasks={task_3}/>
        </div>
    );
}