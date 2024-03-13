import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddTaskItem} from './components/AddTaskItem';
import {EditableSpan} from './components/EditableSpan';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, taskId: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (id: string, taskId: string, title: string) => void
    updateTitle: (id: string, value: string) => void
}

export function Todolist(props: PropsType) {
    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");

    function updateTitle(title: string) {
        props.updateTitle(props.id, title)
    }

    const updateTask = (taskId: string, title: string) => {
        props.updateTask(props.id, taskId, title)
    }

    const mappingTasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(props.id, t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
        }

        function update(newTitle: string) {
            updateTask(t.id, newTitle)
        }

        return <li key={t.id}>
            <label> <Checkbox onChange={onChangeHandler} checked={t.isDone} color={'warning'}/>
                <EditableSpan oldTitle={t.title} callBack={update} className={t.isDone ? "is-done" : ""}/></label>
            <IconButton onClick={onClickHandler} size='small' color='warning' disabled={!t.isDone}><DeleteIcon/> </IconButton>
        </li>
    })


    return <Paper elevation={3} style={{padding:'10px'}}>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTitle}/>
            <button onClick={removeTodolist}>❌</button>
        </h3>
        <AddTaskItem onClick={addTaskHandler} placeholder='Add new task'/>
        <ButtonGroup>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'} size={'small'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'} size={'small'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'} size={'small'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </ButtonGroup>
        <ul>
            {mappingTasks}
        </ul>

    </Paper>
}


