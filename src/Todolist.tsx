import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddTaskItem} from './components/AddTaskItem';
import {EditableSpan} from './components/EditableSpan';
import {Button, IconButton} from '@mui/material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (mainId: string, id: string, value: string) => void
    updateTitle: (id: string, value: string) => void
}

export function Todolist(props: PropsType) {
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    function updateTitle(title: string) {
        props.updateTitle(props.id, title)
    }

    const updateTask = (taskId: string, value: string) => {
        props.updateTask(props.id, taskId, value)
    }

    const mappingTasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
        }

        function update(value: string) {
            updateTask(t.id, value)
        }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan oldTitle={t.title} callBack={update}/>
            <button onClick={onClickHandler}>x</button>
            <IconButton>❤</IconButton>
        </li>
    })


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddTaskItem onClick={addTaskHandler}/>
        <ul>
            {mappingTasks}
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


