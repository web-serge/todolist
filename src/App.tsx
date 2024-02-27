import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksType = {
    [key: string]: TaskType[]
}
function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<TodoListsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    function removeTodolist(mainId: string) {
        setTodolists(todolists.filter(el => el.id !== mainId))
        delete tasks[mainId]
    }
    function removeTask(mainId: string, id: string) {
        setTasks({...tasks, [mainId]: tasks[mainId].filter(el => el.id !== id)})
    }

    function addTask(mainId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [mainId]: [task,...tasks[mainId]]})
    }

    function changeStatus(mainId:string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [mainId]: tasks[mainId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el =>
            el.id === todolistId
                ? {...el, filter: value}
                : el))
    }

    return (
        <div className="App">
            {todolists.map(el => {
                // let tasksForTodolist = tasks[el.id];
                //
                // if (el.filter === "active") {
                //     tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                // }
                // if (el.filter === "completed") {
                //     tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                // }
                return (
                    <Todolist title={el.title}
                              key={el.id}
                              todolistId={el.id}
                              tasks={tasks[el.id]}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
