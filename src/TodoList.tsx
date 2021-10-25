import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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

    const filterTasksAll = () => props.changeFilter('all')
    const filterTasksActive = () => props.changeFilter('active')
    const filterTasksCompleted = () => props.changeFilter('completed')

    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle)
            setTitle("")
        }
    }
    const AddTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const changeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    placeholder="Enter your task..."
                    onChange={changeTitleValue}
                    onKeyPress={AddTaskOnEnter}
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