import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todoListID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    }

    function addTask(title: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})

    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }


    return (
        <div className="App">
            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;