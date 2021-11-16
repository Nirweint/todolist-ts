import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addItemHandler = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
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
            addItemHandler()
        }
    }

    const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : undefined

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                placeholder="Enter title..."
                onChange={changeTitleValueHandler}
                onKeyPress={AddTaskOnEnterHandler}
            />
            <button onClick={addItemHandler}>+</button>
            {errorMessage}
        </div>
    );
}