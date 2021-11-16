import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const changeTitleValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeTaskTitleOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    const onEditMode = () => {
        setEditMode(true)
        props.title && setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }

    return (
        editMode
            ? <input
                value={title}
                autoFocus={true} // after double click focusing on input
                onBlur={offEditMode}
                onChange={changeTitleValueHandler}
                onKeyPress={changeTaskTitleOnEnterHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}