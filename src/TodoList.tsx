import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType> // TaskType []
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const filterTasksAll = () => props.changeFilter('all');
    const filterTasksActive = () => props.changeFilter('active');
    const filterTasksCompleted = () => props.changeFilter('completed');

    const addTaskHandler = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const changeTitleValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const AddTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const activeStyleBtnAll = props.filter === "all" ? 'active-filter' : '';
    const activeStyleBtnActive = props.filter === "active" ? 'active-filter' : '';
    const activeStyleBtnCompleted = props.filter === "completed" ? 'active-filter' : '';
    const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null


    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)
        const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }

        return (
            <li
                className={task.isDone ? "is-done" : ""}
                key={task.id}
            >
                <input
                    onChange={changeCheckboxHandler}
                    type="checkbox"
                    checked={task.isDone}
                />
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
                    className={error ? 'error' : ''}
                    value={title}
                    placeholder="Enter your task..."
                    onChange={changeTitleValueHandler}
                    onKeyPress={AddTaskOnEnterHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                {errorMessage}
            </div>
            <ul className="todoListUl">
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={activeStyleBtnAll}
                    onClick={filterTasksAll}
                >All
                </button>
                <button
                    className={activeStyleBtnActive}
                    onClick={filterTasksActive}
                >Active
                </button>
                <button
                    className={activeStyleBtnCompleted}
                    onClick={filterTasksCompleted}
                >Completed
                </button>
            </div>
        </div>
    );
}