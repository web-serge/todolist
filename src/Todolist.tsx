import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (mainId: string, id: string) => void
    changeFilter: (todolistId:string, value: FilterValuesType) => void
    addTask: (mainId: string, title: string) => void
    changeTaskStatus: (mainId:string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (mainID: string) => void
}

export function Todolist(props: PropsType) {
    function getTasks() {
        let tasksForTodolist = props.tasks;
        if (props.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => !t.isDone);
        }
        if (props.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.isDone);
        }
        return tasksForTodolist
    }

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistId,title.trim());
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

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    function removeTodolist() {
        props.removeTodolist(props.todolistId)
    }

    return <div>
        <h3>{props.title}</h3>
        <button onClick={removeTodolist}>DELETE</button>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                getTasks().map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId ,t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} >
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
