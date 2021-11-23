import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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

    const errorMessage = error && 'title is required';
    const errorStyleForButton = error ? 'secondary' : 'primary';

    return (
        <div>
            <TextField
                variant={"outlined"}
                size={'small'}
                error={error}
                value={title}
                onChange={changeTitleValueHandler}
                onKeyPress={AddTaskOnEnterHandler}
                label={"Title"}
                helperText={errorMessage}
            />
            <IconButton
                onClick={addItemHandler}
                color={errorStyleForButton}
                size={'small'}
            >
                <AddBox fontSize={'large'}/>
            </IconButton>
        </div>
    );
}