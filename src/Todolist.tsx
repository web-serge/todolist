import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddTaskItem} from './components/AddTaskItem';
import {EditableSpan} from './components/EditableSpan';

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
            <label> <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                <EditableSpan oldTitle={t.title} callBack={update} className={t.isDone ? "is-done" : ""}/></label>
            <button onClick={onClickHandler}>✘</button>
        </li>
    })


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTitle}/>
            <button onClick={removeTodolist}>❌</button>
        </h3>
        <AddTaskItem onClick={addTaskHandler} placeholder='Add new task'/>
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
        <ul>
            {mappingTasks}
        </ul>

    </div>
}


