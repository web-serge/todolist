// @flow
import * as React from 'react';
import {ChangeEvent, useState} from 'react';

type EditType = {
    oldTitle: string
    callBack: (newTitle: string) => void
    className?: string
};
export const EditableSpan = ({oldTitle, callBack, className}: EditType) => {
    const [newTitle, setNewTitle] = useState(oldTitle)
    const [edit, setEdit] = useState<boolean>(false)

    const addTask = () => {
        callBack(newTitle)
    }
    const editHandler = () => {
        setEdit(!edit)
        if (edit) addTask()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        <>
            {edit && <input onBlur={editHandler}
                            autoFocus
                            value={newTitle}
                            onChange={onChangeHandler}/>}
            {!edit && <span onDoubleClick={editHandler} className={className}>{oldTitle}</span>}
        </>
    )
};