import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App() {

    const task_1: Array<TaskType> = [ // TaskType []
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ];

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={task_1}/>
            {/*<TodoList title={"What to buy"}/>*/}
            {/*<TodoList title={"What to read"}/>*/}
        </div>
    );
}

export default App;
