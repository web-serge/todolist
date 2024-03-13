// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PostAddIcon from '@mui/icons-material/PostAdd';

type AddTaskItemType = {
    onClick: (title: string) => void
    placeholder?: string
};
export const AddTaskItem = (props: AddTaskItemType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.onClick(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }


    return (
        <div style={{padding: '10px 0'}}>
            <TextField label={!!error ? 'ERROR' : props.placeholder} variant="outlined" size={'small'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
            />
            <IconButton>
                <PostAddIcon  onClick={addTask}/>
            </IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};