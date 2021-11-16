import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType> // TaskType []
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
}
export const TodoList = (props: TodoListPropsType) => {

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }
    const filterTasksAll = () => props.changeFilter('all', props.id);
    const filterTasksActive = () => props.changeFilter('active', props.id);
    const filterTasksCompleted = () => props.changeFilter('completed', props.id);
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    };
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }


    const activeStyleBtnAll = props.filter === "all" ? 'active-filter' : '';
    const activeStyleBtnActive = props.filter === "active" ? 'active-filter' : '';
    const activeStyleBtnCompleted = props.filter === "completed" ? 'active-filter' : '';

    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitleHandler = (title: string) => {
            props.changeTaskTitle(task.id,title,props.id)
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
                <EditableSpan title={task.title} setNewTitle={changeTaskTitleHandler}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    return (
        <div className="todoList">
            <div className={"todoListTitle"}>
                <h3>
                    <EditableSpan title={props.title} setNewTitle={changeTodolistTitleHandler}/>
                </h3>
                <button onClick={removeTodoListHandler}>X</button>
            </div>

            <AddItemForm addItem={addTaskHandler}/>

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