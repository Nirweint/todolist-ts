import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType> // TaskType []
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")

    const tasksJSXElements = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })

    const filterTasksAll = () => props.changeFilter('all')
    const filterTasksActive = () => props.changeFilter('active')
    const filterTasksCompleted = () => props.changeFilter('completed')

    const addTask = () => {
        if (title) {
            props.addTask(title)
            setTitle("")
        }
    }

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder="Enter your task..."
                    onChange={changeValue}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul className="todoListUl">
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={filterTasksAll}>All</button>
                <button onClick={filterTasksActive}>Active</button>
                <button onClick={filterTasksCompleted}>Completed</button>
            </div>
        </div>
    );
}