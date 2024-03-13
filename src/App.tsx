import React, {useEffect, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddTaskItem} from './components/AddTaskItem';
import {
    addNewTasksArrayAC,
    addTaskAC,
    changeStatusAC,
    deleteTasksAC,
    removeTaskAC, setLocalTasksAC,
    taskReducer,
    updateTaskAC
} from './reducers/task-reducer';
import {
    addNewTodoListAC,
    changeFilterAC,
    removeTodolistAC,
    renameTodolistAC, setLocalTodoAC,
    todoListReducer
} from './reducers/todoListReducer';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(todoListReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false},
            {id: v1(), title: "Banana", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ]
    });
//local storage
    useEffect(() => {
        const todo = localStorage.getItem('todoLists')
        const taskItems = localStorage.getItem('tasks')

        if (todo && taskItems) {
            dispatchTodoLists(setLocalTodoAC(JSON.parse(todo)))
            dispatchTasks(setLocalTasksAC(JSON.parse(taskItems)))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(todoLists))
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [todoLists, tasks]);


// dispatch task
    function removeTask(id: string, taskId: string) {
        dispatchTasks(removeTaskAC(id, taskId));
    }

    function addTask(id: string, title: string) {
        dispatchTasks(addTaskAC(id, title));
    }

    function changeStatus(id: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeStatusAC(id, taskId, isDone))
    }

    function updateTask(id: string, taskId: string, title: string) {
        dispatchTasks(updateTaskAC(id, taskId, title))
    }

// dispatch todoList
    function removeTodolist(id: string) {
        dispatchTodoLists(removeTodolistAC(id));
        dispatchTasks(deleteTasksAC(id))
    }

    function changeFilter(id: string, filter: FilterValuesType) {
        dispatchTodoLists(changeFilterAC(id, filter))
    }

    function addTodoList  (title: string) {
        const id = v1() //! верный ли вариант создавать здесь айдишку
        dispatchTodoLists(addNewTodoListAC(id,title))
        dispatchTasks(addNewTasksArrayAC(id))
    }// ID
    function updateTitle(id: string, newTitle: string) {
        dispatchTodoLists(renameTodolistAC(id, newTitle))
    }

    return (
        <div className="App">
            <AddTaskItem onClick={addTodoList} placeholder='Add new todolist'/>
            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTitle={updateTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
